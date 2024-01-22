package fu.swp.dorm_mnm.service.baseImpl;

import fu.swp.dorm_mnm.exception.ResourceNotFoundException;
import fu.swp.dorm_mnm.model.RoomType;
import fu.swp.dorm_mnm.repository.base.RoomTypeRepository;
import fu.swp.dorm_mnm.service.base.RoomTypeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomTypeServiceImpl implements RoomTypeService {

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Override
    public List<RoomType> findAll() {
        return roomTypeRepository.findAll();
    }

    @Override
    public Optional<RoomType> findById(Long id) {
        return roomTypeRepository.findById(id);
    }

    @Override
    public void remove(Long id) {
        RoomType roomType = roomTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room Type Not Found"));
        roomTypeRepository.delete(roomType);
    }

    @Override
    public RoomType save(RoomType roomType) {
        return roomTypeRepository.save(roomType);
    }

}
