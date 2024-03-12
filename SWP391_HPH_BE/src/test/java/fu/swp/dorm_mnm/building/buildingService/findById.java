package fu.swp.dorm_mnm.building.buildingService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
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
public class findById {
    @Mock
    private BuildingRepository buildingRepository;
    @InjectMocks
    private BuildingServiceImpl buildingServiceImpl;;

    private Building validBuilding;
    private Building invalidBuilding;
    private Building boundaryBuildingMax;
    private Building boundaryBuildingMin;
    private Building emptyBuilding;

    @BeforeEach
    void setUp() {
        validBuilding = new Building().builder().buildingId(2L).buildingName("Dom A").numberFloor(5).build();
        invalidBuilding = null;
        boundaryBuildingMin = new Building().builder().buildingId(1L).buildingName("Dom min").numberFloor(0).build();
        boundaryBuildingMin = new Building().builder().buildingId(Long.MAX_VALUE).buildingName("Dom max")
                .numberFloor(999).build();
        emptyBuilding = null;
    }

    @Test
    @DisplayName("Test for valid buildingId")
    public void testvalidBuilingId() {
        Long buildingId = 2L;
        when(buildingRepository.findById(buildingId)).thenReturn(Optional.of(validBuilding));
        Optional<Building> actualBuilding = buildingServiceImpl.findById(buildingId);

        assertTrue(actualBuilding.isPresent());
        assertEquals(validBuilding, actualBuilding.get());
    }

    @Test
    @DisplayName("Test for invalid buildingId")
    public void testInValidBuilingId() {
        Long buildingId = 999L;
        when(buildingRepository.findById(buildingId)).thenReturn(Optional.empty());
        Optional<Building> actualBuilding = buildingServiceImpl.findById(buildingId);

        assertFalse(actualBuilding.isPresent());
    }

    @Test
    @DisplayName("Test for boundary buildingId(min)")
    public void testBoundaryBedIdMin() {
        Long buildingId = 1L;
        when(buildingRepository.findById(buildingId)).thenReturn(Optional.of(boundaryBuildingMin));
        Optional<Building> actualBuilding = buildingServiceImpl.findById(buildingId);

        assertTrue(actualBuilding.isPresent());
        assertEquals(boundaryBuildingMin, actualBuilding.get());
    }

    @Test
    @DisplayName("Test for boundary buildingId(max)")
    public void testBoundaryBedIdMax() {
        Long buildingId = Long.MAX_VALUE;
        when(buildingRepository.findById(buildingId)).thenReturn(Optional.of(boundaryBuildingMax));
        Optional<Building> actualBuilding = buildingServiceImpl.findById(buildingId);

        assertTrue(actualBuilding.isPresent());
        assertEquals(boundaryBuildingMax, actualBuilding.get());
    }

    @Test
    @DisplayName("Test for empty buildingId")
    public void testEmptyBuildingId() {
        Long buildingId = null;
        Optional<Building> actualBuilding = buildingServiceImpl.findById(buildingId);

        assertFalse(actualBuilding.isPresent());
    }
}
