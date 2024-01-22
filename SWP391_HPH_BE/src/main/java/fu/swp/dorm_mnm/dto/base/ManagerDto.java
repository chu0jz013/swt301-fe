package fu.swp.dorm_mnm.dto.base;

import fu.swp.dorm_mnm.model.Manager;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ManagerDto {

    private Long id;
    private String description;
    private String createdAt;
    private String updatedAt;
    private Long userId;
    private UserDto userDto;

    public ManagerDto(Manager manager) {
        this.id = manager.getManagerId();
        this.description = manager.getDescription();
        this.createdAt = manager.getCreatedAt().toString();
        this.updatedAt = manager.getUpdatedAt().toString();
        this.userId=manager.getUser().getId();
        this.userDto=new UserDto(manager.getUser());
    }

}
