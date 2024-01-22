package fu.swp.dorm_mnm.controller.base;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fu.swp.dorm_mnm.model.Guard;
import fu.swp.dorm_mnm.service.base.GuardService;

@RestController
@RequestMapping("/guard")
public class GuardController {

    @Autowired
    private GuardService guardService;


    @GetMapping("get-guard-by-userid/{userId}")
    @PreAuthorize("hasAuthority('guard:read')")
    public Guard getGuardByUserId(@PathVariable Integer userId) {
        return guardService.getGuardByUserId(userId);
    }
}
