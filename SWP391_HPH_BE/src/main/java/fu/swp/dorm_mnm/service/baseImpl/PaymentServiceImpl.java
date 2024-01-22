package fu.swp.dorm_mnm.service.baseImpl;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fu.swp.dorm_mnm.dto.PageDto;
import fu.swp.dorm_mnm.dto.base.PaymentDto;
import fu.swp.dorm_mnm.model.Bed;
import fu.swp.dorm_mnm.model.BedRequest;
import fu.swp.dorm_mnm.model.Manager;
import fu.swp.dorm_mnm.model.Payment;
import fu.swp.dorm_mnm.model.Student;
import fu.swp.dorm_mnm.repository.base.BedRepository;
import fu.swp.dorm_mnm.repository.base.BedRequestRepository;
import fu.swp.dorm_mnm.repository.base.ManagerRepository;
import fu.swp.dorm_mnm.repository.base.PaymentRepository;
import fu.swp.dorm_mnm.service.base.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private StudentServiceImpl studentService;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BedRequestRepository bedRequestRepository;

    @Autowired
    private BedRepository bedRepository;

    @Autowired
    private ManagerRepository managerRepository;

    @Override
    public Iterable<Payment> findAll() {
        return null;
    }

    @Override
    public Optional<Payment> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public Payment save(Payment payment) {
        return null;
    }

    @Override
    public void remove(Long id) {

    }

    @Override
    public PageDto<PaymentDto> findByUserId(Long userId, Pageable pageable) {
        Optional<Student> studentOptional = studentService.findByUserId(userId);
        Student student = new Student();
        if (studentOptional.isPresent()) {
            student = studentOptional.get();
        }
        Page<Payment> page = paymentRepository.findByStudentStudentId(student.getStudentId(), pageable);
        List<PaymentDto> paymentDtoList = new ArrayList<>();
        for (Payment payment : page.getContent()) {
            paymentDtoList.add(new PaymentDto(payment));
        }
        PageDto<PaymentDto> pageDto = new PageDto<>();
        pageDto.setData(paymentDtoList);
        pageDto.setTotalPages(page.getTotalPages());
        pageDto.setTotalItems(page.getTotalElements());
        pageDto.setCurrentPage(page.getNumber());
        return pageDto;
    }

    @Transactional
    @Override
    public Payment checkPaymentBedRequest(Long id, Long managerId) {

        LocalDateTime now = LocalDateTime.now();
        Timestamp sqlNow = Timestamp.valueOf(now);

        Optional<Payment> payOptional = paymentRepository.findById(id);
        Optional<Manager> managerOptional = managerRepository.findById(managerId);

        if (payOptional.isPresent() && managerOptional.isPresent()) {

            Payment pay = payOptional.get();
            if (pay.getExpirationDate().before(sqlNow)) // check expiration date
                return null;
            pay.setManager(managerOptional.get());
            pay.setStatus("paid");
            pay.setUpdatedAt(sqlNow);

            BedRequest breq = pay.getBedRequest();
            breq.setStatus("approved");
            breq.setUpdatedAt(sqlNow);

            Bed bed = breq.getBed();
            bed.setStatus("occupied");
            bed.setUpdatedAt(sqlNow);

            paymentRepository.save(pay);
            bedRequestRepository.save(breq);
            bedRepository.save(bed);

            return pay;
        }
        return null;
    }

    @Transactional
    @Override
    public Payment unCheckPaymentBedRequest(Long id, Long managerId) {

        LocalDateTime now = LocalDateTime.now();
        Timestamp sqlNow = Timestamp.valueOf(now);

        Optional<Payment> payOptional = paymentRepository.findById(id);
        Optional<Manager> managerOptional = managerRepository.findById(managerId);

        if (payOptional.isPresent() && payOptional.isPresent()) {

            Payment pay = payOptional.get();
            if (pay.getExpirationDate().before(sqlNow)) // check expiration date
                return null;
            pay.setManager(managerOptional.get());
            pay.setStatus("not paid");

            BedRequest breq = pay.getBedRequest();
            breq.setStatus("rejected");

            Bed bed = breq.getBed();
            bed.setStatus("vacant");
            bed.setStudent(null);

            paymentRepository.save(pay);
            bedRequestRepository.save(breq);
            bedRepository.save(bed);

            return pay;
        }
        return null;
    }

    @Override
    public PageDto<PaymentDto> getAllPaymentByFilter(String rollNumber, String status1, String status2, Pageable pageable) {
        Page<Payment> page = paymentRepository.getAllStudentByFilter(rollNumber, status1, status2, pageable);

        List<PaymentDto> paymentDtoList = new ArrayList<>();

        for (Payment payment : page.getContent()) {
            paymentDtoList.add(new PaymentDto(payment));
        }

        PageDto<PaymentDto> pageDto = new PageDto<>();
        pageDto.setData(paymentDtoList);
        pageDto.setTotalPages(page.getTotalPages());
        pageDto.setTotalItems(page.getTotalElements());
        pageDto.setCurrentPage(page.getNumber());

        return pageDto;
    }

}
