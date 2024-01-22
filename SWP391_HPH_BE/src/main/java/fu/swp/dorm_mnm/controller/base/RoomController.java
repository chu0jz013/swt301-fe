package fu.swp.dorm_mnm.controller.base;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fu.swp.dorm_mnm.dto.PageDto;
import fu.swp.dorm_mnm.dto.base.BedDto;
import fu.swp.dorm_mnm.dto.base.RoomDto;
import fu.swp.dorm_mnm.model.Bed;
import fu.swp.dorm_mnm.model.Room;
import fu.swp.dorm_mnm.repository.base.BuildingRepository;
import fu.swp.dorm_mnm.repository.base.RoomRepository;
import fu.swp.dorm_mnm.repository.base.RoomTypeRepository;
import fu.swp.dorm_mnm.service.base.RoomService;

@RestController
@RequestMapping("/room")
public class RoomController {
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Autowired
    private BuildingRepository buildingRepository;

    @PostMapping
    @PreAuthorize("hasAuthority('room:create')")
    public ResponseEntity<Room> createNewRoom(@RequestBody RoomDto roomdto) {
        Room resp = roomService.createNewRoom(roomdto);
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('room:read')")
    public ResponseEntity<RoomDto> getRoomById(@PathVariable Long id) {
        Optional<Room> room = roomService.findById(id);
        return room.isPresent() ? new ResponseEntity<>(new RoomDto(room.get()), HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('room:update')")
    public ResponseEntity<Room> updateRoom(@PathVariable Long id, @RequestBody RoomDto roomRequest) {
        Optional<Room> roomRequestOptional = roomRepository.findById(id);
        Room room = new Room();

        return roomRequestOptional.map(roomRequest1 -> {
            return new ResponseEntity<>(roomRepository.save(room), HttpStatus.OK);
        }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('room:delete')")
    public ResponseEntity<Room> deleteRoomById(@PathVariable Long id) {
        Optional<Room> roomRequestOptional = roomRepository.findById(id);
        return roomRequestOptional.map(bedRequest -> {
            roomRepository.deleteById(id);
            return new ResponseEntity<>(bedRequest, HttpStatus.OK);
        }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    @PreAuthorize("hasAuthority('room:read')")
    public ResponseEntity<PageDto<RoomDto>> getRoomsByParameters(
            @RequestParam(required = false) Long buildingId,
            @RequestParam(required = false) Long roomTypeId,
            @RequestParam(required = false) Integer floor,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int pageNo) {

        Pageable pageable = PageRequest.of(pageNo, 6);
        PageDto<RoomDto> page = roomService.getRoomDtoByParam(roomTypeId, buildingId, floor, status, pageable);

        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @PostMapping("/add-rooms")
    @PreAuthorize("hasAuthority('room:create')")
    public ResponseEntity<List<RoomDto>> createBedByRoomId(@RequestBody List<RoomDto> roomDtoList) {
        List<RoomDto> resp = new ArrayList<>();

        for (RoomDto rdto : roomDtoList) {
            resp.add(roomService.save(rdto));
        }

        return new ResponseEntity<>(resp, HttpStatus.CREATED);
    }

    @GetMapping("/{roomId}/beds")
    @PreAuthorize("hasAuthority('bed:read')")
    public ResponseEntity<List<BedDto>> getBedsByRoomId(@PathVariable Long roomId) {
        Optional<Room> room = roomService.findById(roomId);
        List<BedDto> resp = new ArrayList<>();

        if (room.isPresent()) {
            List<Bed> beds = room.get().getBeds();
            for (Bed b : beds) {
                BedDto bdto = new BedDto(b);
                resp.add(bdto);
            }
            return new ResponseEntity<>(resp, HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/manager")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<PageDto<Room>> getAllRoom(
            @RequestParam Long semesterId,
            @RequestParam(required = false) Long buildingId,
            @RequestParam(required = false) Long roomTypeId,
            @RequestParam(required = false) Long floor,
            @RequestParam(defaultValue = "0") int pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 8);
        PageDto<Room> pageDto = roomService.findAll(semesterId, buildingId, roomTypeId, floor, pageable);
        return new ResponseEntity<>(pageDto, HttpStatus.OK);
    }

}
