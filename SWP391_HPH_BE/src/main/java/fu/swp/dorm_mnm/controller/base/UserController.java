package fu.swp.dorm_mnm.controller.base;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fu.swp.dorm_mnm.dto.PageDto;
import fu.swp.dorm_mnm.dto.base.UserDto;
import fu.swp.dorm_mnm.exception.ResourceNotFoundException;
import fu.swp.dorm_mnm.model.User;
import fu.swp.dorm_mnm.repository.base.UserRepository;
import fu.swp.dorm_mnm.service.base.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<PageDto<UserDto>> getAllUser(
            @RequestParam(required = false) String partialName,
            @RequestParam(required = false) Long roleId,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 8);
        PageDto<UserDto> pageDto = userService.getAllUser(roleId, partialName, status, pageable);
        return new ResponseEntity<>(pageDto, HttpStatus.OK);
    }

    @GetMapping("/userdetails")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<UserDto> getUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        UserDto userDto = new UserDto(user);
        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" +
                        id));
        return new ResponseEntity<>((new UserDto(user)), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('user:update')")
    public ResponseEntity<User> updateStatus(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));

        user.setStatus(userDetails.getStatus());
        user.setUpdatedAt(new Date());

        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('user:delete')")
    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user-pic/{userId}")
    public ResponseEntity<?> getUserImage(@PathVariable Long userId) {
        byte[] resp = userService.getUserImage(userId);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.IMAGE_JPEG)
                .body(resp);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('user:create')")
    public ResponseEntity<?> createUser(
            @RequestPart("userDto") UserDto userDto,
            @RequestPart("file") MultipartFile userImage) {
        UserDto resp = userService.save(userImage, userDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(resp);
    }

    @PutMapping
    @PreAuthorize("hasAuthority('user:create')")
    public ResponseEntity<?> updateUser(
            @RequestPart("userDto") UserDto userDto,
            @RequestPart("file") MultipartFile userImage) {
        UserDto resp = userService.update(userImage, userDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(resp);
    }
}
