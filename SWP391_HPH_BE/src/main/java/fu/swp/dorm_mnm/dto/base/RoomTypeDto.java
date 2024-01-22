package fu.swp.dorm_mnm.dto.base;

import fu.swp.dorm_mnm.model.RoomType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RoomTypeDto {

    private Long id;
    private String roomTypeName;
    private String roomTypeDescription;
    private String updateAt;
    private String createdAt;

    public RoomTypeDto(RoomType rt) {
        this.id = rt.getRoomTypeId();
        this.roomTypeName = rt.getRoomTypeName();
        this.roomTypeDescription = rt.getRoomTypeDescription();
        this.createdAt = rt.getCreatedAt().toString();
        this.updateAt = rt.getUpdatedAt().toString();
    }
}
