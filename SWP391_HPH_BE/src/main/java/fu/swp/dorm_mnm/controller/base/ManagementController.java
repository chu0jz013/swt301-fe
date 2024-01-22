package fu.swp.dorm_mnm.controller.base;

import fu.swp.dorm_mnm.dto.PageDto;
import fu.swp.dorm_mnm.dto.base.ManagerDto;
import fu.swp.dorm_mnm.model.Manager;
import fu.swp.dorm_mnm.repository.base.ManagerRepository;
import fu.swp.dorm_mnm.service.base.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/manager")
public class ManagementController {

    @Autowired
    private ManagerService managerService;
    
    @Autowired
    private ManagerRepository managerRepository;

    @GetMapping
    @PreAuthorize("hasAuthority('manager:read')")
    public ResponseEntity<PageDto<ManagerDto>> get(@RequestParam(defaultValue = "0") int pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 8);
        PageDto<ManagerDto> resp = managerService.findAll(pageable);
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

    @GetMapping("/{managerId}")
    @PreAuthorize("hasAuthority('manager:read')")
    public ResponseEntity<ManagerDto> getManagerById(@PathVariable Long managerId) {
        return new ResponseEntity<>(new ManagerDto(managerRepository.findById(managerId).get()), HttpStatus.OK);
    }

    @PostMapping
    public String post() {
        return "POST:: management controller";
    }

    @PutMapping
    public String put() {
        return "PUT:: management controller";
    }

    @DeleteMapping
    public String delete() {
        return "DELETE:: management controller";
    }
}
