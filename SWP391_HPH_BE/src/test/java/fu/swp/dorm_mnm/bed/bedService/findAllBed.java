package fu.swp.dorm_mnm.bed.bedService;

import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import fu.swp.dorm_mnm.model.BedRequest;
import fu.swp.dorm_mnm.repository.base.BedRequestRepository;
import fu.swp.dorm_mnm.service.baseImpl.BedRequestServiceImpl;

@ExtendWith(MockitoExtension.class)
public class findAllBed {

  @Mock
  private BedRequestRepository bedRequestRepository;

  @InjectMocks
  private BedRequestServiceImpl bedRequestService;

  @Test
  public void testFindAllEmptyRepository() {
    // Arrange
    when(bedRequestRepository.findAll()).thenReturn(Collections.emptyList());

    // Act
    Iterable<BedRequest> result = bedRequestService.findAll();

    // Assert
    Assertions.assertTrue(((List<?>) result).isEmpty());
  }

  @Test
  public void testFindAllNonEmptyRepository() {
    // Arrange
    List<BedRequest> bedRequests = Arrays.asList(
        new BedRequest(/* parameters */),
        new BedRequest(/* parameters */),
        new BedRequest(/* parameters */));
    when(bedRequestRepository.findAll()).thenReturn(bedRequests);

    // Act
    Iterable<BedRequest> result = bedRequestService.findAll();

    // Assert
    Assertions.assertEquals(bedRequests.size(), ((List<?>) result).size());
    for (BedRequest request : bedRequests) {
      Assertions.assertTrue(((List<?>) result).contains(request));
    }
  }

  @Test
  public void testFindAllRepositoryException() {
    // Arrange
    when(bedRequestRepository.findAll()).thenThrow(new RuntimeException("Repository error"));

    // Act & Assert
    Assertions.assertThrows(
        RuntimeException.class,
        () -> bedRequestService.findAll(),
        "Repository error should be propagated");
  }
}
