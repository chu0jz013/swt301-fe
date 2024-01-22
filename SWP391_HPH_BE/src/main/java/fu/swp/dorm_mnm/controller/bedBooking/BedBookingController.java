package fu.swp.dorm_mnm.controller.bedBooking;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fu.swp.dorm_mnm.dto.BedBookingDto;
import fu.swp.dorm_mnm.model.Building;
import fu.swp.dorm_mnm.model.RoomType;
import fu.swp.dorm_mnm.service.base.BuildingService;
import fu.swp.dorm_mnm.service.base.RoomTypeService;
import jakarta.annotation.security.PermitAll;

@RestController
@RequestMapping("/book-bed")
public class BedBookingController {

    @Autowired
    private BuildingService buildingService;

    @Autowired
    private RoomTypeService roomTypeService;

    

    @GetMapping("/get-param")
    // @PreAuthorize("hasAuthority('bed-request:read')")
    @PermitAll
    public ResponseEntity<HashMap<String, Object>> getBuildingRoomType(
            @RequestParam Long buildingId, @RequestParam Long roomTypeId, @RequestParam Integer floorNumber,
            @RequestParam Long roomId, @RequestParam Long bedId) {
        List<Building> buildingList = buildingService.findAll();
        List<RoomType> roomTypeList = roomTypeService.findAll();
        Integer floors = buildingService.findById(bedId).get().getNumberFloor();


        BedBookingDto bbdto = new BedBookingDto(buildingList, roomTypeList);

        HashMap<String, Object> map = new HashMap<>();
        map.put("bedBooking", bbdto);
        map.put("floors", floors);

        return new ResponseEntity<>(map, HttpStatus.OK);
    }

}
