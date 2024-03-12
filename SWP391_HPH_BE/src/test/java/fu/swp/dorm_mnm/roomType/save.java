package fu.swp.dorm_mnm.roomType;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
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

import fu.swp.dorm_mnm.model.RoomType;
import fu.swp.dorm_mnm.repository.base.RoomTypeRepository;
import fu.swp.dorm_mnm.service.baseImpl.RoomTypeServiceImpl;

@ExtendWith(MockitoExtension.class)
public class save {
    @Mock
    private RoomTypeRepository roomTypeRepository;
    @InjectMocks
    private RoomTypeServiceImpl roomTypeServiceImpl;

    private RoomType testCase01;// create room type successfully
    private RoomType testCase02;// roomTypeName is a required field
    private RoomType testCase03;// description is a required field
    private RoomType testCase04;// numberOfBeds must be greater than 0
    private RoomType testCase05;// price must be greater than 0
    private RoomType testCase06;// Room type name cannot contain only white spaces
    private RoomType testCase07;// roomTypeDescription is a required field
    private RoomType testCase08;// numberOfBeds must be greater than 0
    private RoomType testCase09;// price must be greater than 0

    @BeforeEach
    void setup() {
        testCase01 = new RoomType().builder().roomTypeName("3 beds").roomTypeDescription("3 beds per room")
                .numberOfBeds(3).price(4.600000f).build();
        testCase02 = new RoomType().builder().roomTypeName("").roomTypeDescription("3 beds per room")
                .numberOfBeds(3).price(4.600000f).build();
        testCase03 = new RoomType().builder().roomTypeName("3 beds").roomTypeDescription("")
                .numberOfBeds(3).price(4.600000f).build();
        testCase04 = new RoomType().builder().roomTypeName("3 beds").roomTypeDescription("3 beds per room")
                .numberOfBeds(0).price(4.600000f).build();
        testCase05 = new RoomType().builder().roomTypeName("3 beds").roomTypeDescription("3 beds per room")
                .numberOfBeds(3).price(0f).build();
        testCase06 = new RoomType().builder().roomTypeName("   ").roomTypeDescription("3 beds per room")
                .numberOfBeds(3).price(4.600000f).build();
        testCase07 = new RoomType().builder().roomTypeName("3 beds").roomTypeDescription("   ")
                .numberOfBeds(3).price(4.600000f).build();
        testCase08 = new RoomType().builder().roomTypeName("3 beds").roomTypeDescription("3 beds per room")
                .numberOfBeds(-1).price(4.600000f).build();
        testCase09 = new RoomType().builder().roomTypeName("3 beds").roomTypeDescription("3 beds per room")
                .numberOfBeds(3).price(-1f).build();
    }

    @Test
    @DisplayName("create room type successfully")
    public void createRoomType01() {

        when(roomTypeRepository.save(any(RoomType.class))).thenReturn(testCase01);

        RoomType savedRoomType = roomTypeServiceImpl.save(testCase01);

        assertEquals(testCase01, savedRoomType);
    }

    @Test
    @DisplayName("roomTypeName is a required field")
    public void createRoomType02() {

        when(roomTypeRepository.save(any(RoomType.class))).thenReturn(testCase02);

        RoomType savedRoomType = roomTypeServiceImpl.save(testCase02);

        assertEquals(testCase02, savedRoomType);
    }

    @Test
    @DisplayName("roomTypeName is a required field")
    public void createRoomType03() {

        when(roomTypeRepository.save(any(RoomType.class))).thenReturn(testCase03);

        RoomType savedRoomType = roomTypeServiceImpl.save(testCase03);

        assertEquals(testCase01, savedRoomType);
    }
}
