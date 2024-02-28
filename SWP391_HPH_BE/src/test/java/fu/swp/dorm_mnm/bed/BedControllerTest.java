package fu.swp.dorm_mnm.bed;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import fu.swp.dorm_mnm.controller.base.BedController;
import fu.swp.dorm_mnm.dto.base.BedDto;
import fu.swp.dorm_mnm.model.Bed;
import fu.swp.dorm_mnm.service.base.BedService;

@ExtendWith(MockitoExtension.class)
public class BedControllerTest {

    @Mock
    private BedService bedService;

    @InjectMocks
    private BedController bedController;

    private Bed sampleBed;
    private BedDto sampleBedDto;

    @BeforeEach
    void setUp() {
        sampleBed = new Bed();

        sampleBedDto = new BedDto();

    }

    @Test
    public void testCreateNewBed() {
        when(bedService.createBed(any(BedDto.class))).thenReturn(sampleBedDto);

        ResponseEntity<BedDto> responseEntity = bedController.createNewBed(sampleBedDto);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals(sampleBedDto, responseEntity.getBody());
    }

    @Test
    public void testGetAllBed() {
        List<Bed> bedList = new ArrayList<>();
        bedList.add(sampleBed);
        when(bedService.findAll()).thenReturn(bedList);

        ResponseEntity<Iterable<Bed>> responseEntity = bedController.getAllBed();

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(bedList, responseEntity.getBody());
    }

    @Test
    public void testGetBedById() {
        when(bedService.findById(1L)).thenReturn(Optional.of(sampleBed));

        ResponseEntity<Bed> responseEntity = bedController.getBedById(1L);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(sampleBed, responseEntity.getBody());
    }

    @Test
    public void testUpdateStatus() {
        when(bedService.findById(1L)).thenReturn(Optional.of(sampleBed));

        ResponseEntity<Bed> responseEntity = bedController.updateStatus(1L, sampleBed);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(sampleBed, responseEntity.getBody());
    }

    @Test
    public void testUpdateStatusWithRollNumber() {
        when(bedService.updateBedOccupation(1L, "12345")).thenReturn(sampleBedDto);

        ResponseEntity<BedDto> responseEntity = bedController.updateStatus(1L, "12345");

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(sampleBedDto, responseEntity.getBody());
    }

    @Test
    public void testDeleteBedById() {
        when(bedService.findById(1L)).thenReturn(Optional.of(sampleBed));

        ResponseEntity<String> responseEntity = bedController.deleteBedById(1L);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Bed id: 1 was deleted!", responseEntity.getBody());
    }

    @Test
    public void testDeleteBedByIdNotFound() {
        when(bedService.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<String> responseEntity = bedController.deleteBedById(1L);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertEquals("BED NOT FOUND", responseEntity.getBody());
    }

    @Test
    public void testCreateBedByRoomId() {
        List<BedDto> bedDtoList = new ArrayList<>();
        bedDtoList.add(sampleBedDto);
        when(bedService.createBed(any(BedDto.class))).thenReturn(sampleBedDto);

        ResponseEntity<List<BedDto>> responseEntity = bedController.createBedByRoomId(bedDtoList);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals(bedDtoList, responseEntity.getBody());
    }

    @Test
    public void testGetAllBeds() {
        List<Bed> bedList = new ArrayList<>();
        bedList.add(sampleBed);
        when(bedService.findAll()).thenReturn(bedList);

        String bedsString = bedController.getAllBeds();

        assertEquals(bedList.toString(), bedsString);
    }
}
