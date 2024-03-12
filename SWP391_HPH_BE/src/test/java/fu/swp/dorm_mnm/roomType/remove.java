package fu.swp.dorm_mnm.roomType;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyLong;
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
public class remove {
    @Mock
    private RoomTypeRepository roomTypeRepository;
    @InjectMocks
    private RoomTypeServiceImpl roomTypeServiceImpl;

    private RoomType existedRoomType;

    @BeforeEach
    void setup() {
        existedRoomType = new RoomType();
        existedRoomType.setRoomTypeId(1L);
    }

    @Test
    @DisplayName("remove existing roomtype")
    public void testRemoveExistRoom() {
        when(roomTypeRepository.findById(1L)).thenReturn(Optional.of(existedRoomType));

        roomTypeServiceImpl.remove(1L);
    }

    @Test
    @DisplayName("remove nonexist roomtype")
    public void testRemoveNonExistRoomType() {
        when(roomTypeRepository.findById(anyLong())).thenReturn(Optional.empty());

        roomTypeServiceImpl.remove(2L);
    }
}
