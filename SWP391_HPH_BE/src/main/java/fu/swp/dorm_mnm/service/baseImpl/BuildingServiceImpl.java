package fu.swp.dorm_mnm.service.baseImpl;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fu.swp.dorm_mnm.dto.base.BuildingDto;
import fu.swp.dorm_mnm.exception.ResourceNotFoundException;
import fu.swp.dorm_mnm.model.Building;
import fu.swp.dorm_mnm.repository.base.BuildingRepository;
import fu.swp.dorm_mnm.service.base.BuildingService;

@Service
public class BuildingServiceImpl implements BuildingService {

    @Autowired
    private BuildingRepository buildingRepository;

    @Override
    public List<Building> findAll() {
        return buildingRepository.findAll();
    }

    @Override
    public Optional<Building> findById(Long id) {
        return buildingRepository.findById(id);
    }

    @Override
    public void remove(Long id) {
        Building building = buildingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Building Not Found"));
        buildingRepository.delete(building);
    }

    @Override
    public Building save(Building building) {
        return buildingRepository.save(building);
    }

    @Override
    public BuildingDto save(BuildingDto bdto) {

        LocalDateTime now = LocalDateTime.now();
        Timestamp sqlNow = Timestamp.valueOf(now);

        Building b = new Building();
        b.setBuildingName(bdto.getBuildingName());
        b.setCreatedAt(sqlNow);
        b.setUpdatedAt(sqlNow);
        b.setNumberFloor(bdto.getNumberFloor());

        return new BuildingDto(buildingRepository.save(b));
    }
}