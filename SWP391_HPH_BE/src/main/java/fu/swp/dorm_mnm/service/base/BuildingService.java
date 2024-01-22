package fu.swp.dorm_mnm.service.base;

import java.util.List;
import java.util.Optional;

import fu.swp.dorm_mnm.dto.base.BuildingDto;
import fu.swp.dorm_mnm.model.Building;

public interface BuildingService {
    
    public List<Building> findAll();

    public Optional<Building> findById(Long id);

    public Building save(Building building);

    public void remove(Long id);

    public BuildingDto save(BuildingDto bdto);
}