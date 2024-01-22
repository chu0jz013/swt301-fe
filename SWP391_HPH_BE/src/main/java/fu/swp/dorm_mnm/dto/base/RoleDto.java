package fu.swp.dorm_mnm.dto.base;

import fu.swp.dorm_mnm.model.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class RoleDto {

    private Long id;
    private String roleName;
    private String description;

    public RoleDto(Role role) {
        this.id = role.getId();
        this.roleName = role.getName();
        this.description = role.getDescription();
    }

}
