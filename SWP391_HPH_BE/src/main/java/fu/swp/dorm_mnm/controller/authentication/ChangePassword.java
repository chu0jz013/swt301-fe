package fu.swp.dorm_mnm.controller.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fu.swp.dorm_mnm.dto.ChangePasswordDto;
import fu.swp.dorm_mnm.security.service.AuthenticationService;

@RestController
@RequestMapping("/change-password")
public class ChangePassword {
    @Autowired
    private AuthenticationService authenticationService;

    @PutMapping
    // @PreAuthorize("hasAuthority('#changePasswordDto.userid')")
    @PreAuthorize("#changePasswordDto.userid == authentication.principal.id")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangePasswordDto changePasswordDto) {
        boolean change = authenticationService.changePassword(changePasswordDto);
        if (!change) {
            return ResponseEntity.badRequest().body("Incorrect Password!");
        }
        return ResponseEntity.ok("Change Password Successfully!");
    }
}
