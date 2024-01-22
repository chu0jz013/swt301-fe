package fu.swp.dorm_mnm.dto.base;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import fu.swp.dorm_mnm.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {

    private Long id;

    private String username;
    private String password; // maybe ko co
    private Long roleId;

    private String fullName;
    private String email;
    private String gender;
    private String dob;
    private String phone;
    private String address;
    private String status;
    private String createdAt;
    private String updatedAt;
    private String roleName;
    private String studentRollNumber;

    private Long managerId;
    private Long guardId;
    private Long studentId;

    private ManagerDto managerDto;
    private GuardDto guardDto;
    private StudentDto studentDto;

    private String message;

    public UserDto(User user) {

        String pattern = "dd/MM/yyyy HH:mm:ss";
        DateFormat df = new SimpleDateFormat(pattern);

        String dobPattern = "dd/MM/yyyy";
        DateFormat dfDob = new SimpleDateFormat(dobPattern);

        this.id = user.getId();
        this.username = user.getUsername();
        this.fullName = user.getFullName();
        this.roleId = user.getRole().getId();
        this.email = user.getEmail();
        this.gender = user.getGender();
        if (user.getDateOfBirth() != null)
            this.dob = dfDob.format(user.getDateOfBirth());
        this.phone = user.getPhone();
        this.address = user.getAddress();
        this.status = user.getStatus();
        this.roleName = user.getRole().getName();
        this.createdAt = df.format(user.getCreatedAt());
        this.updatedAt = df.format(user.getUpdatedAt());

        this.studentRollNumber = user.getStudent() != null ? user.getStudent().getRollNumber() : null;

        this.managerId = user.getManager() != null ? user.getManager().getManagerId() : null;
        this.guardId = user.getGuard() != null ? user.getGuard().getGuardId() : null;
        this.studentId = user.getStudent() != null ? user.getStudent().getStudentId() : null;

    }

}
