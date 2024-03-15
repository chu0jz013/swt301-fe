package fu.swp.dorm_mnm.room.roomService;

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

import fu.swp.dorm_mnm.repository.base.RoomRepository;
import fu.swp.dorm_mnm.service.baseImpl.RoomServiceImpl;

@ExtendWith(MockitoExtension.class)
public class findAll {
    @Mock
    private RoomRepository roomRepository;
    @InjectMocks
    private RoomServiceImpl roomServiceImpl;

}
