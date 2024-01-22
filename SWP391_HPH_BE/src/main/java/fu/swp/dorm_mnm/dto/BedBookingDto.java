package fu.swp.dorm_mnm.dto;

import java.util.ArrayList;
import java.util.List;

import fu.swp.dorm_mnm.dto.base.BedDto;
import fu.swp.dorm_mnm.dto.base.BuildingDto;
import fu.swp.dorm_mnm.dto.base.RoomDto;
import fu.swp.dorm_mnm.dto.base.RoomTypeDto;
import fu.swp.dorm_mnm.model.Building;
import fu.swp.dorm_mnm.model.RoomType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BedBookingDto {

    private List<BuildingDto> buildingDtoList;
    private List<RoomTypeDto> roomTypeDtoList;
    private Integer floor;
    private List<RoomDto> roomDtoList;
    private List<BedDto> bedDtoList;

    public BedBookingDto(List<Building> buildingList, List<RoomType> roomTypeList) {
        List<BuildingDto> buildingDtoList = new ArrayList<>();
        for (Building b : buildingList) {
            buildingDtoList.add(new BuildingDto(b));
        }

        List<RoomTypeDto> roomTypeDtoList = new ArrayList<>();
        for (RoomType rt : roomTypeList) {
            roomTypeDtoList.add(new RoomTypeDto(rt));
        }

        this.buildingDtoList = buildingDtoList;
        this.roomTypeDtoList = roomTypeDtoList;
    }
}
