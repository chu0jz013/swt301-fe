package fu.swp.dorm_mnm.controller.base;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fu.swp.dorm_mnm.model.RequestApplicationType;
import fu.swp.dorm_mnm.service.base.RequestApplicationTypeService;

@RestController
@RequestMapping("/request-application-type")
public class RequestApplicationTypeController {

    @Autowired
    private RequestApplicationTypeService requestApplicationTypeService;

    @PostMapping
    @PreAuthorize("hasAuthority('request-application-type:create')")
    public ResponseEntity<RequestApplicationType> createNewRequestType(
            @RequestBody RequestApplicationType requestApplicationType) {
        return new ResponseEntity<>(requestApplicationTypeService.save(requestApplicationType), HttpStatus.OK);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('request-application-type:read')")
    public ResponseEntity<Iterable<RequestApplicationType>> getAllRequestType() {
        return new ResponseEntity<>(requestApplicationTypeService.findAll(), HttpStatus.OK);
    }
}
