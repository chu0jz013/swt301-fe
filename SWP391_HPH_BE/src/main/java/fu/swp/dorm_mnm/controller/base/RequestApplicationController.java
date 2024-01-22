package fu.swp.dorm_mnm.controller.base;
import java.util.Date;
import java.util.Optional;

import fu.swp.dorm_mnm.repository.base.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fu.swp.dorm_mnm.dto.PageDto;
import fu.swp.dorm_mnm.dto.base.RequestApplicationDto;
import fu.swp.dorm_mnm.model.RequestApplication;
import fu.swp.dorm_mnm.service.base.RequestApplicationService;

@RestController
@RequestMapping("/request-application")
public class RequestApplicationController {

    @Autowired
    private RequestApplicationService requestApplicationService;

    @Autowired
    private ManagerRepository managerRepository;

    @PostMapping
    @PreAuthorize("hasAuthority('request-application:create')")
    public ResponseEntity<RequestApplication> createNewRequestApplication(
            @RequestBody RequestApplication requestApplication) {
        return new ResponseEntity<>(requestApplicationService.save(requestApplication), HttpStatus.OK);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('request-application:read')")
    public ResponseEntity<PageDto<RequestApplicationDto>> getAllRequestApplication(
            @RequestParam(required = false) Long studentId,
            @RequestParam(required = false) Long requestApplicationTypeId,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 8, Sort.by("created_at").descending());
        PageDto<RequestApplicationDto> pageDto = requestApplicationService.findAllReqApp(studentId,
                requestApplicationTypeId, status, pageable);
        return new ResponseEntity<>(pageDto, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('request-application:read')")
    public ResponseEntity<RequestApplication> getRequestApplicationById(@PathVariable Long id) {
        Optional<RequestApplication> requestApplicationOptional = requestApplicationService.findById(id);
        return requestApplicationOptional
                .map(requestApplication -> new ResponseEntity<>(requestApplication, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

//    @PutMapping("/{id}")
//    @PreAuthorize("hasAuthority('request-application:update')")
//    public ResponseEntity<RequestApplication> updateApplicationRequest(@PathVariable Long id,
//            @RequestBody RequestApplicationDto reqAppDto) {
//        Optional<RequestApplication> requestApplicationOptional = requestApplicationService.findById(id);
//        return requestApplicationOptional.map(requestApplication -> {
//            requestApplication.setStatus(reqAppDto.getStatus());
//            requestApplication.setTextResponse(reqAppDto.getTextResponse());
//            requestApplication.setManager(managerRepository.findById(reqAppDto.getManager().getManagerId()).get());
//            requestApplication.setUpdatedAt(new Date());
//            return new ResponseEntity<>(requestApplicationService.save(requestApplication), HttpStatus.OK);
//        }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
//    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('request-application:update')")
    public ResponseEntity<RequestApplication> updateApplicationRequest(@PathVariable Long id,
                                                                       @RequestBody RequestApplicationDto reqAppDto) {
        Optional<RequestApplication> requestApplicationOptional = requestApplicationService.findById(id);
        return requestApplicationOptional.map(requestApplication -> {
            // Set the fields from the DTO
            requestApplication.setStatus(reqAppDto.getStatus());
            requestApplication.setTextResponse(reqAppDto.getTextResponse());

            // Explicitly set the manager field
            requestApplication.setManager(managerRepository.findById(reqAppDto.getManager().getManagerId()).orElse(null));

            // Set the updated timestamp
            requestApplication.setUpdatedAt(new Date());

            // Save the updated entity
            return new ResponseEntity<>(requestApplicationService.save(requestApplication), HttpStatus.OK);
        }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}