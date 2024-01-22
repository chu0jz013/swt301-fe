package fu.swp.dorm_mnm.service.base;


import java.util.List;
import java.util.Optional;

import fu.swp.dorm_mnm.model.RoomType;

public interface RoomTypeService {
    
    public List<RoomType> findAll();

    public Optional<RoomType> findById(Long id);

    public RoomType save(RoomType roomType);

    public void remove(Long id);
}
