package fu.swp.dorm_mnm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fu.swp.dorm_mnm.dto.BedBookingDto;
import fu.swp.dorm_mnm.model.Building;
import fu.swp.dorm_mnm.model.RoomType;
import fu.swp.dorm_mnm.service.base.BuildingService;
import fu.swp.dorm_mnm.service.base.RoomTypeService;

@Service
public class BedBookingService {

    @Autowired
    private BuildingService buildingService;

    @Autowired
    private RoomTypeService roomTypeService;


    public BedBookingDto get(Long bedId) {
        List<Building> buildingList = buildingService.findAll();
        List<RoomType> roomTypeList = roomTypeService.findAll();
        Integer floors = buildingService.findById(bedId).get().getNumberFloor();

        BedBookingDto bbdto = new BedBookingDto(buildingList, roomTypeList);
        bbdto.setFloor(floors);
        

        return bbdto;
    };
}
