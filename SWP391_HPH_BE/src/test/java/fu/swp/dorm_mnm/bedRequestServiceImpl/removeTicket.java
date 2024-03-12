package fu.swp.dorm_mnm.bedRequestServiceImpl;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import fu.swp.dorm_mnm.repository.base.BedRequestRepository;
import fu.swp.dorm_mnm.service.baseImpl.BedRequestServiceImpl;

@ExtendWith(MockitoExtension.class)
public class removeTicket {
  
    @Mock
    BedRequestRepository bedRequestRepository;

    @InjectMocks
    BedRequestServiceImpl bedRequestServiceImpl;

    @Test
    void testRemove() {
        // Mock data
        Long idToRemove = 1L;

        // Call the method to be tested
        bedRequestServiceImpl.remove(idToRemove);

        // Verify that deleteById was called with the correct argument
        verify(bedRequestRepository, times(1)).deleteById(idToRemove);
    }
}