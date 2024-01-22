package fu.swp.dorm_mnm.dto.base;

import java.util.List;

import fu.swp.dorm_mnm.model.Bed;
import fu.swp.dorm_mnm.model.Room;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RoomDto {

    private Long id;
    private String roomName;
    private float roomPrice;
    private Long roomTypeId;
    private String roomTypeName;
    private Long floor;
    private Long buildingId;
    private String buildingName;
    private String createdAt;
    private String updateAt;
    private Integer numberOfAvailableBeds;

    public RoomDto(Room room) {
        this.id = room.getRoomId();
        this.roomName = room.getRoomName();
        this.roomPrice = room.getRoomType().getPrice();
        this.floor = room.getFloor();
        this.createdAt = room.getCreatedAt().toString();
        this.updateAt = room.getUpdatedAt().toString();
        this.buildingId = room.getBuilding() != null ? room.getBuilding().getBuildingId() : null;
        this.buildingName = room.getBuilding() != null ? room.getBuilding().getBuildingName() : null;
        this.roomTypeId = room.getRoomType() != null ? room.getRoomType().getRoomTypeId() : null;
        this.roomTypeName = room.getRoomType() != null ? room.getRoomType().getRoomTypeName() : null;

        Integer numBedLeft = 0;
        List<Bed> bedLeft = room.getBeds();
        if (bedLeft != null) {
            for (Bed b : bedLeft) {
                if (b.getStatus().equalsIgnoreCase("vacant")) {
                    numBedLeft++;
                }
            }
        }
        this.numberOfAvailableBeds = numBedLeft;
    }

}
