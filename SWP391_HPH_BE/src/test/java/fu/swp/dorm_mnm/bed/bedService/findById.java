package fu.swp.dorm_mnm.bed.bedService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import fu.swp.dorm_mnm.model.Bed;
import fu.swp.dorm_mnm.repository.base.BedRepository;
import fu.swp.dorm_mnm.service.baseImpl.BedServiceImpl;

@ExtendWith(MockitoExtension.class)
public class findById {

  @Mock
  private BedRepository bedRepository;

  @InjectMocks
  private BedServiceImpl bedServiceImpl;

  @Test
  @DisplayName("Test for valid bed ID")
  public void testValidBedId() {
    // Arrange
    Long bedId = 1L;
    Bed validBed = new Bed().builder().bedId(1L).bedName("G505 - Bed 1").status("vacant").build();
    when(bedRepository.findById(bedId)).thenReturn(Optional.of(validBed));

    // Act
    Optional<Bed> actualBed = bedServiceImpl.findById(bedId);

    // Assert
    assertTrue(actualBed.isPresent());
    assertEquals(validBed, actualBed.get());
  }

  @Test
  @DisplayName("Test for invalid bed ID")
  public void testInvalidBedId() {
    // Arrange
    Long bedId = 999L; // Invalid bed ID
    Bed invalidBed = null; // Simulate invalid bed ID not found
    when(bedRepository.findById(bedId)).thenReturn(Optional.empty());

    // Act
    Optional<Bed> actualBed = bedServiceImpl.findById(bedId);

    // Assert
    assertFalse(actualBed.isPresent());
  }

  @Test
  @DisplayName("Test for boundary bed ID (Minimum)")
  public void testBoundaryBedIdMin() {
    // Arrange
    Long bedId = 0L; // Minimum bed ID
    Bed boundaryBedMin = new Bed().builder().bedId(0L).bedName("G500 - Bed 0").status("vacant").build();
    when(bedRepository.findById(bedId)).thenReturn(Optional.of(boundaryBedMin));

    // Act
    Optional<Bed> actualBed = bedServiceImpl.findById(bedId);

    // Assert
    assertTrue(actualBed.isPresent());
    assertEquals(boundaryBedMin, actualBed.get());
  }

  @Test
  @DisplayName("Test for boundary bed ID (Maximum)")
  public void testBoundaryBedIdMax() {
    // Arrange
    Long bedId = Long.MAX_VALUE; // Maximum bed ID
    Bed boundaryBedMax = new Bed().builder().bedId(Long.MAX_VALUE).bedName("G999 - Bed MAX").status("occupied").build();
    when(bedRepository.findById(bedId)).thenReturn(Optional.of(boundaryBedMax));

    // Act
    Optional<Bed> actualBed = bedServiceImpl.findById(bedId);

    // Assert
    assertTrue(actualBed.isPresent());
    assertEquals(boundaryBedMax, actualBed.get());
  }

  @Test
  @DisplayName("Test for empty bed ID")
  public void testEmptyBedId() {
    // Arrange
    Long bedId = null; // Empty bed ID
    Bed emptyBedId = null; // Simulate empty bed ID

    // Act
    Optional<Bed> actualBed = bedServiceImpl.findById(bedId);

    // Assert
    assertFalse(actualBed.isPresent());
  }
}