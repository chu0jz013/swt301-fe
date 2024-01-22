package fu.swp.dorm_mnm.dto.base;

import fu.swp.dorm_mnm.model.Guard;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GuardDto {
    private Long id;
    private String createAt;
    private String updateAt;

    public GuardDto(Guard g) {
        this.id = g.getGuardId();
        this.createAt = g.getCreatedAt().toString();
        this.updateAt = g.getUpdatedAt().toString();
    }

}
