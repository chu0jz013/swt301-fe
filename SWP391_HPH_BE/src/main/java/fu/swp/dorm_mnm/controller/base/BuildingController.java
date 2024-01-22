package fu.swp.dorm_mnm.controller.base;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fu.swp.dorm_mnm.dto.base.BuildingDto;
import fu.swp.dorm_mnm.dto.base.RoomDto;
import fu.swp.dorm_mnm.model.Building;
import fu.swp.dorm_mnm.model.Room;
import fu.swp.dorm_mnm.repository.base.BuildingRepository;
import fu.swp.dorm_mnm.service.base.BuildingService;
import fu.swp.dorm_mnm.service.base.RoomService;

@RestController
@RequestMapping("/building")
public class BuildingController {

    @Autowired
    private BuildingRepository buildingRepository;

    @Autowired
    private BuildingService buildingService;

    @Autowired
    private RoomService roomService;

    @PostMapping
    @PreAuthorize("hasAuthority('building:create')")
    public ResponseEntity<BuildingDto> createBuilding(@RequestBody BuildingDto bdto) {

        return new ResponseEntity<>(buildingService.save(bdto), HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('building:read')")
    public ResponseEntity<Iterable<Building>> getAllBuildings() {
        return new ResponseEntity<>(buildingRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/admin")
    @PreAuthorize("hasAuthority('building:read')")
    public ResponseEntity<List<BuildingDto>> getAllBuildingsForAdmin() {
        List<Building> buildings = buildingService.findAll();
        List<BuildingDto> buildingDtos = new ArrayList<>();

        for (Building b:
             buildings) {
            buildingDtos.add(new BuildingDto(b));
        }
        return new ResponseEntity<>(buildingDtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('building:read')")
    public ResponseEntity<BuildingDto> getBuildingById(@PathVariable Long id) {
        Optional<Building> building = buildingRepository.findById(id);
        BuildingDto bdto = new BuildingDto(building.get());

        List<Integer> floors = new ArrayList<>();
        for (int i = 1; i <= bdto.getNumberFloor(); i++) {
            floors.add(i);
        }
        bdto.setFloors(floors);

        return new ResponseEntity<>(bdto, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('building:update')")
    public ResponseEntity<Building> updateBuildingById(@PathVariable Long id, @RequestBody Building buildingRequest) {
        Building building = buildingRepository.findById(id).get();
        building.setUpdatedAt(new Date());
        building.setBuildingName(buildingRequest.getBuildingName());
        building.setNumberFloor(buildingRequest.getNumberFloor());
        return new ResponseEntity<>(buildingService.save(building), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('building:delete')")
    public ResponseEntity<String> deleteBuildingById(@PathVariable Long id) {
        buildingService.remove(id);
        return new ResponseEntity<>("Building Deleted", HttpStatus.OK);
    }

    @GetMapping("/{buildingId}/rooms")
    @PreAuthorize("hasAuthority('room:read')")
    public ResponseEntity<List<RoomDto>> getRoomsByBuildingId(@PathVariable Long buildingId) {
        List<Room> roomList = roomService.getRoomsByBuildingId(buildingId);
        List<RoomDto> roomDtoList = new ArrayList<>();
        for (Room r : roomList) {
            RoomDto rdto = new RoomDto(r);
            roomDtoList.add(rdto);
        }
        return new ResponseEntity<>(roomDtoList, HttpStatus.OK);
    }

    @PostMapping("/add-buildings")
    @PreAuthorize("hasAuthority('building:create')")
    public ResponseEntity<List<BuildingDto>> createListBuilding(@RequestBody List<BuildingDto> bdtoList) {
        List<BuildingDto> resp = new ArrayList<>();

        for (BuildingDto bdto : bdtoList) {
            resp.add(buildingService.save(bdto));
        }

        return new ResponseEntity<>(resp, HttpStatus.CREATED);
    }
}
