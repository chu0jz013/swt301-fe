package fu.swp.dorm_mnm.building.buildingService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
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
public class save {
    @Mock
    private BuildingRepository buildingRepository;
    @InjectMocks
    private BuildingServiceImpl buildingServiceImpl;

    private Building validBuildingSave;
    private Building buildingNameRequired;
    private Building buildingNameSpaces;
    private Building numberFloorblow0;

    @BeforeEach
    void setup() {
        validBuildingSave = new Building().builder().buildingName("Dom A").numberFloor(5).build();
        buildingNameRequired = new Building().builder().buildingName("").numberFloor(5).build();
        buildingNameSpaces = new Building().builder().buildingName("    ").numberFloor(5).build();
        numberFloorblow0 = new Building().builder().buildingName("Dom L").numberFloor(-1).build();
    }

    @Test
    @DisplayName("valid Building created")
    public void TestSaveValidBuilding() {

        when(buildingRepository.save(validBuildingSave)).thenReturn(validBuildingSave);

        Building savedBuilding = buildingServiceImpl.save(validBuildingSave);

        assertEquals(savedBuilding, validBuildingSave);
    }

    @Test
    @DisplayName("Test for empty BuildingName")
    public void testEmptyBuildingName() {
        // Building inputBuilding = new Building();
        // inputBuilding.setBuildingName("dom1");
        // inputBuilding.setNumberFloor(5);
        // when(buildingRepository.save(inputBuilding)).thenReturn(buildingNameRequired);
        // Building actualBuildingName = buildingServiceImpl.save(actualBuildingName);
        // assertEquals(inputBuilding, actualBuildingName);
        when(buildingRepository.save(buildingNameRequired)).thenReturn(buildingNameRequired);

        Building savedBuilding = buildingServiceImpl.save(buildingNameRequired);

        assertEquals(buildingNameRequired, savedBuilding);
    }
}
