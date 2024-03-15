package fu.swp.dorm_mnm.roomType;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import fu.swp.dorm_mnm.model.RoomType;
import fu.swp.dorm_mnm.repository.base.RoomTypeRepository;
import fu.swp.dorm_mnm.service.baseImpl.RoomTypeServiceImpl;

@ExtendWith(MockitoExtension.class)
public class findAll {
    @Mock
    private RoomTypeRepository roomTypeRepository;
    @InjectMocks
    private RoomTypeServiceImpl roomTypeServiceImpl;

    @Test
    public void testFindAll() {
        // Given
        List<RoomType> roomTypes = new ArrayList<>();
        roomTypes.add(new RoomType(1L, "Single", "Single bed room", 1, 100.0f, null, null, null));
        roomTypes.add(new RoomType(2L, "Double", "Double bed room", 2, 150.0f, null, null, null));

        when(roomTypeRepository.findAll()).thenReturn(roomTypes);

        // When
        List<RoomType> result = roomTypeServiceImpl.findAll();

        // Then
        assertEquals(roomTypes.size(), result.size());
        for (int i = 0; i < roomTypes.size(); i++) {
            assertEquals(roomTypes.get(i), result.get(i));
        }
    }

    @Test
    public void testFindAllEmpty() {
        // given
        List<RoomType> roomTypes = new ArrayList<>();
        when(roomTypeRepository.findAll()).thenReturn(roomTypes);

        // when
        List<RoomType> result = roomTypeServiceImpl.findAll();

        // then
        assertEquals(roomTypes.size(), result.size());
    }

    @Test
    public void testFindAllWithNullResult() {
        // given
        when(roomTypeRepository.findAll()).thenReturn(null);

        // when
        List<RoomType> result = roomTypeServiceImpl.findAll();

        // then
        assertNull(result);
    }
}
