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

import fu.swp.dorm_mnm.dto.base.RoomDto;
import fu.swp.dorm_mnm.model.Room;
import fu.swp.dorm_mnm.model.RoomType;
import fu.swp.dorm_mnm.repository.base.RoomTypeRepository;
import fu.swp.dorm_mnm.service.base.RoomService;
import fu.swp.dorm_mnm.service.base.RoomTypeService;

@RestController
@RequestMapping("/room-type")
public class RoomTypeController {

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Autowired
    private RoomTypeService roomTypeService;

    @Autowired
    private RoomService roomService;

    @PostMapping
    @PreAuthorize("hasAuthority('room-type:create')")
    public ResponseEntity<RoomType> createRoomType(@RequestBody RoomType roomType) {
        roomType.setCreatedAt(new Date());
        roomType.setUpdatedAt(new Date());
        return new ResponseEntity<>(roomTypeRepository.save(roomType), HttpStatus.OK);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('room-type:read')")
    public ResponseEntity<Iterable<RoomType>> getAllRoomTypes() {
        return new ResponseEntity<>(roomTypeRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('room-type:read')")
    public ResponseEntity<Optional<RoomType>> getRoomTypeById(@PathVariable Long id) {
        return new ResponseEntity<>(roomTypeRepository.findById(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('room-type:update')")
    public ResponseEntity<RoomType> updateRoomTypeById(@PathVariable Long id, @RequestBody RoomType roomTypeRequest) {
        RoomType roomType = roomTypeRepository.findById(id).get();
        roomType.setUpdatedAt(new Date());
        roomType.setRoomTypeName(roomTypeRequest.getRoomTypeName());
        roomType.setRoomTypeDescription(roomTypeRequest.getRoomTypeDescription());
        roomType.setPrice(roomTypeRequest.getPrice());
        return new ResponseEntity<>(roomTypeService.save(roomType), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('room-type:delete')")
    public ResponseEntity<String> deleteRoomTypeById(@PathVariable Long id) {
        roomTypeService.remove(id);
        return new ResponseEntity<>("Room Type Deleted", HttpStatus.OK);
    }

    @GetMapping("/{roomTypeId}/rooms")
    @PreAuthorize("hasAuthority('room:read')")
    public ResponseEntity<List<RoomDto>> listRoomsByRoomTypeId(@PathVariable Long roomTypeId) {
        List<Room> roomList = roomService.getRoomsByRoomTypeId(roomTypeId);
        List<RoomDto> respRoomDtoList = new ArrayList<>();
        for (Room r : roomList) {
            RoomDto rdto = new RoomDto(r);
            respRoomDtoList.add(rdto);
        }

        return new ResponseEntity<List<RoomDto>>(respRoomDtoList, HttpStatus.OK);
    }
}
