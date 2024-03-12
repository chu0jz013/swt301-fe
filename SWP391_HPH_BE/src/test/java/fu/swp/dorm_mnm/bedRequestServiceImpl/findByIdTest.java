package fu.swp.dorm_mnm.bedRequestServiceImpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import fu.swp.dorm_mnm.model.BedRequest;
import fu.swp.dorm_mnm.repository.base.BedRequestRepository;
import fu.swp.dorm_mnm.service.baseImpl.BedRequestServiceImpl;

@ExtendWith(MockitoExtension.class)

public class findByIdTest {

  @Mock
  private BedRequestRepository bedRequestRepository;

  @InjectMocks
  private BedRequestServiceImpl bedRequestService;

  @BeforeEach
  void setUp() {
    // bedRequestService = bedRequestRepository.findById(null);
  }

  @Test
  void findById_ValidId_ReturnsBedRequest() {
    // Arrange
    Long id = 1L;
    BedRequest expectedBedRequest = new BedRequest(); 
    // expectedBedRequest.setBed();


    when(bedRequestRepository.findById(id)).thenReturn(Optional.of(expectedBedRequest));



    // Act
    Optional<BedRequest> result = bedRequestService.findById(id);

    // Assert
    assertEquals(Optional.of(expectedBedRequest), result);
  }

  @Test
  void findById_InvalidId_ReturnsEmptyOptional() {
    // Arrange
    Long id = 2L;
    when(bedRequestRepository.findById(id)).thenReturn(Optional.empty());

    // Act
    Optional<BedRequest> result = bedRequestService.findById(id);

    // Assert
    assertFalse(result.isPresent());
  }

  @Test
  void findById_NullId_ReturnsEmptyOptional() {
    // Arrange
    when(bedRequestRepository.findById(null)).thenReturn(Optional.empty());

    // Act
    Optional<BedRequest> result = bedRequestService.findById(null);

    // Assert
    assertFalse(result.isPresent());
  }

  @Test
  void findById_NegativeId_ReturnsEmptyOptional() {
    // Arrange
    Long id = -1L;
    when(bedRequestRepository.findById(id)).thenReturn(Optional.empty());

    // Act
    Optional<BedRequest> result = bedRequestService.findById(id);

    // Assert
    assertFalse(result.isPresent());
  }

  @Test
  void findById_LargestId_ReturnsBedRequest() {
    // Arrange
    Long id = Long.MAX_VALUE;
    BedRequest expectedBedRequest = new BedRequest(); // Create a mock BedRequest
    when(bedRequestRepository.findById(id)).thenReturn(Optional.of(expectedBedRequest));

    // Act
    Optional<BedRequest> result = bedRequestService.findById(id);

    // Assert
    assertEquals(Optional.of(expectedBedRequest), result);
  }

  @Test
  void findById_SmallestId_ReturnsEmptyOptional() {
    // Arrange
    Long id = Long.MIN_VALUE;
    when(bedRequestRepository.findById(id)).thenReturn(Optional.empty());

    // Act
    Optional<BedRequest> result = bedRequestService.findById(id);

    // Assert
    assertFalse(result.isPresent());
  }

}