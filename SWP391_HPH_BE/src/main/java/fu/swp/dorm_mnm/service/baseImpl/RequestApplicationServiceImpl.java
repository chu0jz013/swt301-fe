package fu.swp.dorm_mnm.service.baseImpl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import fu.swp.dorm_mnm.dto.PageDto;
import fu.swp.dorm_mnm.dto.base.RequestApplicationDto;
import fu.swp.dorm_mnm.model.RequestApplication;
import fu.swp.dorm_mnm.model.RequestApplicationType;
import fu.swp.dorm_mnm.model.Student;
import fu.swp.dorm_mnm.repository.base.RequestApplicationRepository;
import fu.swp.dorm_mnm.repository.base.RequestApplicationTypeRepository;
import fu.swp.dorm_mnm.repository.base.StudentRepository;
import fu.swp.dorm_mnm.service.base.RequestApplicationService;

@Service
public class RequestApplicationServiceImpl implements RequestApplicationService {

    @Autowired
    private RequestApplicationRepository requestApplicationRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private RequestApplicationTypeRepository requestApplicationTypeRepository;

    @Override
    public Iterable<RequestApplication> findAll() {
        return requestApplicationRepository.findAll();
    }

    @Override
    public Optional<RequestApplication> findById(Long id) {
        return requestApplicationRepository.findById(id);
    }

    @Override
    public RequestApplication save(RequestApplication reqApp) {
        Optional<Student> studentOptional = studentRepository.findById(reqApp.getStudent().getStudentId());
        Optional<RequestApplicationType> requestApplicationTypeOptional = requestApplicationTypeRepository
                .findById(reqApp.getRequestApplicationType().getRequestApplicationTypeId());

        if (studentOptional.isPresent() && requestApplicationTypeOptional.isPresent()) {
            Student student = studentOptional.get();
            RequestApplicationType requestApplicationType = requestApplicationTypeOptional.get();

            // Check if the RequestApplication already exists
            if (reqApp.getRequestApplicationId() != null) {
                Optional<RequestApplication> existingRequestAppOptional = requestApplicationRepository.findById(reqApp.getRequestApplicationId());
                if (existingRequestAppOptional.isPresent()) {
                    RequestApplication existingRequestApp = existingRequestAppOptional.get();
                    existingRequestApp.setUpdatedAt(new Date());
                    existingRequestApp.setStudent(student);
                    existingRequestApp.setStatus(reqApp.getStatus()); // or set the desired status
                    existingRequestApp.setRequestApplicationType(requestApplicationType);
                    existingRequestApp.setRequestContent(reqApp.getRequestContent());
                    return requestApplicationRepository.save(existingRequestApp);
                }
            }

            // If the RequestApplication does not exist, create a new one
            RequestApplication newRequestApplication = new RequestApplication();
            newRequestApplication.setCreatedAt(new Date());
            newRequestApplication.setUpdatedAt(new Date());
            newRequestApplication.setStudent(student);
            newRequestApplication.setStatus("Pending");
            newRequestApplication.setRequestApplicationType(requestApplicationType);
            newRequestApplication.setRequestContent(reqApp.getRequestContent());

            return requestApplicationRepository.save(newRequestApplication);
        } else {
            return null;
        }
    }


    @Override
    public void remove(Long id) {
        requestApplicationRepository.deleteById(id);
    }

    @Override
    public PageDto<RequestApplicationDto> findAllReqApp(Long studentId, Long requestApplicationId, String status,
                                                        Pageable pageable) {
        Page<RequestApplication> page = requestApplicationRepository.findAllAppReq(studentId, requestApplicationId,
                status,
                pageable);
        List<RequestApplication> requestApplications = page.getContent();
        List<RequestApplicationDto> requestApplicationDtos = new ArrayList<>();

        for (RequestApplication requestApplication : requestApplications) {
            requestApplicationDtos.add(new RequestApplicationDto(requestApplication));
        }

        PageDto<RequestApplicationDto> pageDto = new PageDto<>();
        pageDto.setData(requestApplicationDtos);
        pageDto.setCurrentPage(page.getNumber());
        pageDto.setTotalPages(page.getTotalPages());
        pageDto.setTotalItems(page.getTotalElements());
        return pageDto;
    }
}