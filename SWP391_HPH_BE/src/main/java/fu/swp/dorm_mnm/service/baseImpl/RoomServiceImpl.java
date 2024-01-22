package fu.swp.dorm_mnm.service.baseImpl;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import fu.swp.dorm_mnm.dto.PageDto;
import fu.swp.dorm_mnm.dto.base.RoomDto;
import fu.swp.dorm_mnm.model.Bed;
import fu.swp.dorm_mnm.model.Room;
import fu.swp.dorm_mnm.model.RoomType;
import fu.swp.dorm_mnm.repository.base.BedRepository;
import fu.swp.dorm_mnm.repository.base.BedRequestRepository;
import fu.swp.dorm_mnm.repository.base.BuildingRepository;
import fu.swp.dorm_mnm.repository.base.RoomRepository;
import fu.swp.dorm_mnm.repository.base.RoomTypeRepository;
import fu.swp.dorm_mnm.service.base.RoomService;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Autowired
    private BuildingRepository buildingRepository;

    @Autowired
    private BedRepository bedRepository;

    @Autowired
    private BedRequestRepository bedRequestRepository; 

    @Override
    public Room createNewRoom(RoomDto roomDto) {
        RoomType roomType = roomTypeRepository.findById(roomDto.getRoomTypeId()).get();
        Room room = new Room();
        room.setRoomName(roomDto.getRoomName());
        room.setRoomType(roomType);
        room.setBuilding(buildingRepository.findById(roomDto.getBuildingId()).get());
        room.setFloor(roomDto.getFloor());
        room.setCreatedAt(new Date());
        room.setUpdatedAt(new Date());
        Room newRoom=roomRepository.save(room);
        List<Bed> beds = new ArrayList<>();
        for (int i = 0; i < roomType.getNumberOfBeds(); i++) {
            int num = i + 1;
            Bed bed = new Bed();
            bed.setBedName(roomDto.getRoomName() + " - Bed " + num);
            bed.setStatus("vacant");
            bed.setRoom(newRoom);
            bed.setCreatedAt(new Date());
            bed.setUpdatedAt(new Date());
            bedRepository.save(bed);
            beds.add(bed);
        }
        return newRoom;
    }

    @Override
    public PageDto<Room> findAll(Long semesterId, Long buildingId, Long roomTypeId, Long floor, Pageable pageable) {
        PageDto<Room> pageDtoRoom = new PageDto<>();
        Page<Room> page = roomRepository.getAllRoomForManager(semesterId, buildingId, roomTypeId, floor, pageable);
        pageDtoRoom.setData(page.getContent());
        pageDtoRoom.setCurrentPage(page.getNumber());
        pageDtoRoom.setTotalItems(page.getTotalElements());
        pageDtoRoom.setTotalPages(page.getTotalPages());
        return pageDtoRoom;
    }

    @Override
    public List<Room> getRoomsByBuildingId(Long buildingId) {
        return roomRepository.getRoomsByBuildingId(buildingId);
    }

    @Override
    public List<Room> getRoomsByRoomTypeId(Long roomTypeId) {
        return roomRepository.getRoomsByRoomTypeId(roomTypeId);
    }

    @Override
    public List<Room> getRoomsByRoomTypeIdBuildingIdFloorStatus(Long roomTypeId, Long buildingId, Integer floor,
            String status) {
        return roomRepository.getRoomsByRoomTypeIdBuildingIdFloorStatus(roomTypeId, buildingId, floor, status);
    }

    @Override
    public Optional<Room> findById(Long roomId) {
        return roomRepository.findById(roomId);
    }

    @Override
    public RoomDto save(RoomDto rdto) {

        LocalDateTime now = LocalDateTime.now();
        Timestamp sqlNow = Timestamp.valueOf(now);

        Room room = new Room();

        room.setBuilding(buildingRepository.findById(rdto.getBuildingId()).get());
        room.setCreatedAt(sqlNow);
        room.setUpdatedAt(sqlNow);
        room.setFloor(rdto.getFloor());
        room.setRoomName(rdto.getRoomName());
        room.setRoomType(roomTypeRepository.findById(rdto.getRoomTypeId()).get());

        return new RoomDto(roomRepository.save(room));
    }

    @Override
    public PageDto<RoomDto> getRoomDtoByParam(Long roomTypeId, Long buildingId, Integer floor, String status,
            Pageable pageable) {

        Page<Room> page = roomRepository.getRoomPageByParam(roomTypeId, buildingId, floor, status, pageable);

        List<Room> rooms = page.getContent();
        List<RoomDto> roomDtos = new ArrayList<>();
        for (Room r : rooms) {
            roomDtos.add(new RoomDto(r));
        }
        PageDto<RoomDto> pageDto = new PageDto<>();
        pageDto.setData(roomDtos);
        pageDto.setCurrentPage(page.getNumber());
        pageDto.setTotalPages(page.getTotalPages());
        pageDto.setTotalItems(page.getTotalElements());
        return pageDto;
    }

}
