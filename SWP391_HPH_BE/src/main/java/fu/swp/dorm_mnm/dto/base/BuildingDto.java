package fu.swp.dorm_mnm.dto.base;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

import fu.swp.dorm_mnm.model.Building;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BuildingDto {
    private Long id;
    private String buildingName;
    private int numberFloor;
    private String createdAt;
    private String updateAt;
    private List<Integer> floors;

    public BuildingDto(Building b) {
        String pattern = "dd/MM/yyyy HH:mm:ss";
        DateFormat df = new SimpleDateFormat(pattern);

        this.id = b.getBuildingId();
        this.buildingName = b.getBuildingName();
        this.numberFloor = b.getNumberFloor();
        this.createdAt = df.format(b.getCreatedAt());
        this.updateAt = df.format(b.getUpdatedAt());
    }

}
