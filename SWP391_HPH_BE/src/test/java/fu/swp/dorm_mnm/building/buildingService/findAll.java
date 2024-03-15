package fu.swp.dorm_mnm.building.buildingService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.aspectj.lang.annotation.Before;
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
public class findAll {
    @Mock
    private BuildingRepository buildingRepository;
    @InjectMocks
    private BuildingServiceImpl buildingServiceImpl;;

    @Test
    public void testFindAll() {
        // Given
        List<Building> buildings = new ArrayList<>();
        buildings.add(new Building(1L, "Building A", 5, null, null, null, null));
        buildings.add(new Building(2L, "Building B", 7, null, null, null, null));

        when(buildingRepository.findAll()).thenReturn(buildings);

        // When
        List<Building> result = buildingServiceImpl.findAll();

        // Then
        assertEquals(buildings.size(), result.size());
        for (int i = 0; i < buildings.size(); i++) {
            assertEquals(buildings.get(i), result.get(i));
        }
    }

    @Test
    public void testFindAllEmpty() {
        // Given
        List<Building> buildings = new ArrayList<>();

        when(buildingRepository.findAll()).thenReturn(buildings);

        // When
        List<Building> result = buildingServiceImpl.findAll();

        // Then
        assertEquals(buildings.size(), result.size());
    }

    @Test
    public void testFindAllWithNullResult() {
        // Given
        when(buildingRepository.findAll()).thenReturn(null);

        // When
        List<Building> result = buildingServiceImpl.findAll();

        // Then
        assertNull(result);
        verify(buildingRepository, times(1)).findAll();
    }
}
