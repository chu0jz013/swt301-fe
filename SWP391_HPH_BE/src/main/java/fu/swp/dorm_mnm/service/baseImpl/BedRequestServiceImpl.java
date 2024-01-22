package fu.swp.dorm_mnm.service.baseImpl;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fu.swp.dorm_mnm.dto.PageDto;
import fu.swp.dorm_mnm.dto.base.BedRequestDto;
import fu.swp.dorm_mnm.model.Bed;
import fu.swp.dorm_mnm.model.BedRequest;
import fu.swp.dorm_mnm.model.Payment;
import fu.swp.dorm_mnm.model.Semester;
import fu.swp.dorm_mnm.model.Student;
import fu.swp.dorm_mnm.repository.base.BedRepository;
import fu.swp.dorm_mnm.repository.base.BedRequestRepository;
import fu.swp.dorm_mnm.repository.base.PaymentRepository;
import fu.swp.dorm_mnm.service.base.BedRequestService;
import fu.swp.dorm_mnm.service.base.BedService;
import fu.swp.dorm_mnm.service.base.SemesterService;
import fu.swp.dorm_mnm.service.base.StudentService;

@Service
public class BedRequestServiceImpl implements BedRequestService {

    @Autowired
    private BedRequestRepository bedRequestRepository;

    @Autowired
    private BedService bedService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private SemesterService semesterService;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BedRepository bedRepository;

    @Override
    public Iterable<BedRequest> findAll() {
        return bedRequestRepository.findAll();
    }

    @Override
    public Optional<BedRequest> findById(Long id) {
        return bedRequestRepository.findById(id);
    }

    @Override
    public BedRequestDto createTicket(Long studentId, Long bedId, Long semesterId) {

        LocalDateTime now = LocalDateTime.now();
        Timestamp sqlNow = Timestamp.valueOf(now);

        Optional<Bed> bedOptional = bedService.findById(bedId);
        Optional<Student> studentOptional = studentService.findById(studentId);
        Optional<Semester> semesterOptional = semesterService.findById(semesterId);

        if (bedOptional.isPresent() && studentOptional.isPresent() && semesterOptional.isPresent()) {
            Bed bed = bedOptional.get();
            Student student = studentOptional.get();
            Semester semester = semesterOptional.get();

            BedRequest bedRequest = new BedRequest();
            bedRequest.setCreatedAt(sqlNow);
            bedRequest.setUpdatedAt(sqlNow);
            bedRequest.setBed(bed);
            bedRequest.setStudent(student);
            bedRequest.setStatus("Pending");
            bedRequest.setSemester(semester);

            return new BedRequestDto(bedRequestRepository.save(bedRequest));
        } else {
            return null;
        }
    }

    @Override
    public BedRequest save(BedRequest bedRequestReq) {

        LocalDateTime now = LocalDateTime.now();
        Timestamp sqlNow = Timestamp.valueOf(now);

        Optional<Bed> bedOptional = bedService.findById(bedRequestReq.getBed().getBedId());
        Optional<Student> studentOptional = studentService.findByUserId(bedOptional.get().getStudent().getStudentId());

        if (bedOptional.isPresent() && studentOptional.isPresent()) {
            Bed bed = bedOptional.get();
            Student student = studentOptional.get();

            BedRequest bedRequest = new BedRequest();
            bedRequest.setCreatedAt(sqlNow);
            bedRequest.setUpdatedAt(sqlNow);
            bedRequest.setBed(bed);
            bedRequest.setStudent(student);
            bedRequest.setStatus("Pending");
            bedRequest.setSemester(bedRequestReq.getSemester());
            return bedRequestRepository.save(bedRequest);
        } else {
            return null;
        }
    }

    @Override
    public void remove(Long id) {
        bedRequestRepository.deleteById(id);
    }

    @Override
    public PageDto<BedRequestDto> findByUserId(String status, Long userId, Pageable pageable) {
        Optional<Student> studentOptional = studentService.findByUserId(userId);
        Student student = new Student();
        if (studentOptional.isPresent()) {
            student = studentOptional.get();
        }
        System.out.println(student.getStudentId());
        Page<BedRequest> page = bedRequestRepository.listBedRequest(status, student.getStudentId(), pageable);
        List<BedRequest> bedRequestList = page.getContent();
        List<BedRequestDto> bedRequestDtoList = new ArrayList<>();
        for (BedRequest bedRequest : bedRequestList) {
            bedRequestDtoList.add(new BedRequestDto(bedRequest));
        }
        PageDto<BedRequestDto> pageDto = new PageDto<>();
        pageDto.setData(bedRequestDtoList);
        pageDto.setCurrentPage(page.getNumber());
        pageDto.setTotalPages(page.getTotalPages());
        pageDto.setTotalItems(page.getTotalElements());
        return pageDto;
    }

    @Transactional
    @Override
    public BedRequestDto bookBed(Long studentId, Long bedId, Long semesterId) {
        LocalDateTime now = LocalDateTime.now();
        Timestamp sqlNow = Timestamp.valueOf(now);

        Optional<Bed> bedOptional = bedService.findById(bedId);
        Optional<Student> studentOptional = studentService.findById(studentId);
        Optional<Semester> semesterOptional = semesterService.findById(semesterId);

        if (bedOptional.isPresent() && studentOptional.isPresent() && semesterOptional.isPresent()) {
            Bed bed = bedOptional.get();
            Student student = studentOptional.get();
            Semester semester = semesterOptional.get();

            if (student.getBed() != null || !bed.getStatus().equalsIgnoreCase("vacant")) {
                return new BedRequestDto();
            }

            BedRequest bedRequest = new BedRequest();
            bedRequest.setCreatedAt(sqlNow);
            bedRequest.setUpdatedAt(sqlNow);
            bedRequest.setBed(bed);
            bedRequest.setStudent(student);
            bedRequest.setStatus("pending");
            bedRequest.setSemester(semester);

            Payment payment = new Payment();
            payment.setCreatedAt(sqlNow);
            payment.setUpdatedAt(sqlNow);
            payment.setAmount(bed.getRoom().getRoomType().getPrice());
            payment.setStatus("pending");
            payment.setStudent(student);
            payment.setBedRequest(bedRequest);
            payment.setSemester(semester);
            payment.setAmount(bed.getRoom().getRoomType().getPrice());
            Timestamp sqlExpiredTime = Timestamp.valueOf(now.plus(15, ChronoUnit.MINUTES)); // 15 min
            payment.setExpirationDate(sqlExpiredTime);

            bed.setStatus("reserved");
            bed.setStudent(student);

            bedRequestRepository.save(bedRequest);
            paymentRepository.save(payment);
            bedRepository.save(bed);

            scanForExpiredPayment();
            return new BedRequestDto(bedRequest);
        } else
            return null;
    }

    @Transactional
    @Override
    @Scheduled(fixedDelay = 60000) // 1 min
    public void scanForExpiredPayment() {
        LocalDateTime now = LocalDateTime.now();
        Timestamp sqlNow = Timestamp.valueOf(now);

        List<Payment> pays = paymentRepository.findAllExpiredPayment(sqlNow);
        if (!pays.isEmpty()) {

            for (Payment p : pays) {
                p.setStatus("expired");
                p.setUpdatedAt(sqlNow);

                BedRequest breq = p.getBedRequest();
                breq.setStatus("expired");
                breq.setUpdatedAt(sqlNow);

                Bed bed = breq.getBed();
                bed.setStudent(null);
                bed.setStatus("vacant");
                bed.setUpdatedAt(sqlNow);

                paymentRepository.save(p);
                bedRequestRepository.save(breq);
                bedRepository.save(bed);
            }
        }
        deleteExpiredPayment();
    }

    @Transactional
    @Override
    @Scheduled(fixedDelay = 60000) // 1 min
    public void deleteExpiredPayment() {
        LocalDateTime now = LocalDateTime.now();
        Timestamp sqlNow = Timestamp.valueOf(now);

        List<Payment> pays = paymentRepository.findAllExpiredPayment(sqlNow);
        if (!pays.isEmpty()) {

            for (Payment p : pays) {
                // remove all expired payment
                BedRequest breq = p.getBedRequest();
                paymentRepository.deleteById(p.getPaymentId());
                bedRequestRepository.deleteById(breq.getBedRequestId());
            }
        }
    }

    @Override
    public PageDto<BedRequestDto> getAllBedRequest(String studentRollNumber, String status, Long semesterId,
            Pageable pageable) {

        Page<BedRequest> page = bedRequestRepository.getAllBedRequest(status, studentRollNumber, semesterId, pageable);
        List<BedRequest> bedRequestList = page.getContent();
        List<BedRequestDto> bedRequestDtoList = new ArrayList<>();
        for (BedRequest bedRequest : bedRequestList) {
            bedRequestDtoList.add(new BedRequestDto(bedRequest));
        }
        PageDto<BedRequestDto> pageDto = new PageDto<>();
        pageDto.setData(bedRequestDtoList);
        pageDto.setCurrentPage(page.getNumber());
        pageDto.setTotalPages(page.getTotalPages());
        pageDto.setTotalItems(page.getTotalElements());
        return pageDto;

    }
}
