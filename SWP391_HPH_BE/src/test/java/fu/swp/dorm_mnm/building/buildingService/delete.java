package fu.swp.dorm_mnm.building.buildingService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import fu.swp.dorm_mnm.model.Building;
import fu.swp.dorm_mnm.repository.base.BuildingRepository;
import fu.swp.dorm_mnm.service.base.BuildingService;
import fu.swp.dorm_mnm.service.baseImpl.BuildingServiceImpl;

@ExtendWith(MockitoExtension.class)
public class delete {
    @Mock
    private BuildingRepository buildingRepository;
    @InjectMocks
    private BuildingServiceImpl buildingServiceImpl;

    private Building existingBuilding;

    @BeforeEach
    void setup() {
        existingBuilding = new Building();
        existingBuilding.setBuildingId(1L);
    }

    @Test
    @DisplayName("remove Exist Building")
    public void removeExistBuilding() {
        when(buildingRepository.findById(1L)).thenReturn(Optional.of(existingBuilding));

        buildingServiceImpl.remove(1L);
    }

    @Test
    @DisplayName("remove nonExist Building")
    public void removeNonExistBuilding() {
        when(buildingRepository.findById(anyLong())).thenReturn(Optional.empty());

        buildingServiceImpl.remove(2L);
    }
}
