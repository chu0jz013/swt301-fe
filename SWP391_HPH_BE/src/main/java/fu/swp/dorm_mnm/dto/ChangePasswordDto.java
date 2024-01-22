package fu.swp.dorm_mnm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordDto {
    
    private Long userid;
    private String oldPassword;
    private String newPassword;
}
