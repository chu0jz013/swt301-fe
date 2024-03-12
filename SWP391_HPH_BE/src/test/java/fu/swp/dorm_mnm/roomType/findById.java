package fu.swp.dorm_mnm.roomType;

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

import fu.swp.dorm_mnm.model.RoomType;
import fu.swp.dorm_mnm.repository.base.RoomTypeRepository;
import fu.swp.dorm_mnm.service.baseImpl.RoomTypeServiceImpl;

@ExtendWith(MockitoExtension.class)
public class findById {
    @Mock
    private RoomTypeRepository roomTypeRepository;
    @InjectMocks
    private RoomTypeServiceImpl roomTypeServiceImpl;

    private RoomType validRoomType;
    private RoomType invalidRoomType;
    private RoomType boundaryMax;
    private RoomType boundaryMin;
    private RoomType emptyRoomType;

    @BeforeEach
    void setup() {
        validRoomType = new RoomType().builder().roomTypeId(1L).roomTypeName("3 beds").build();
        invalidRoomType = null;
        boundaryMin = new RoomType().builder().roomTypeId(0L).roomTypeName("3 Beds").build();
        boundaryMax = new RoomType().builder().roomTypeId(Long.MAX_VALUE).roomTypeName("3 Beds").build();
        emptyRoomType = null;
    }

    @Test
    @DisplayName("Test for valid roomType")
    public void testValidRoom() {
        Long roomId = 1L;
        when(roomTypeRepository.findById(roomId)).thenReturn(Optional.of(validRoomType));
        Optional<RoomType> actualRoomType = roomTypeRepository.findById(roomId);

        assertTrue(actualRoomType.isPresent());
        assertEquals(validRoomType, actualRoomType.get());
    }

    @Test
    @DisplayName("Test for invalid roomType")
    public void testInvalidRoom() {
        Long roomId = 999L;
        when(roomTypeRepository.findById(roomId)).thenReturn(Optional.empty());
        Optional<RoomType> actualRoom = roomTypeRepository.findById(roomId);

        assertFalse(actualRoom.isPresent());
    }

    @Test
    @DisplayName("Test for valid roomType")
    public void testBoundaryMin() {
        Long roomId = 0L;
        when(roomTypeRepository.findById(roomId)).thenReturn(Optional.of(boundaryMin));
        Optional<RoomType> actualRoom = roomTypeRepository.findById(roomId);

        assertTrue(actualRoom.isPresent());
        assertEquals(boundaryMin, actualRoom.get());
    }

    @Test
    @DisplayName("Test for valid roomType")
    public void testBoundaryMax() {
        Long roomId = Long.MAX_VALUE;
        when(roomTypeRepository.findById(roomId)).thenReturn(Optional.of(boundaryMax));
        Optional<RoomType> actualRoom = roomTypeRepository.findById(roomId);

        assertTrue(actualRoom.isPresent());
        assertEquals(boundaryMax, actualRoom.get());
    }

    @Test
    @DisplayName("Test for empty RoomType")
    public void testEmptyBuildingId() {
        Long roomId = null;
        Optional<RoomType> actualRoom = roomTypeRepository.findById(roomId);

        assertFalse(actualRoom.isPresent());
    }
}
