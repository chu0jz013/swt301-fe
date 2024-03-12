package fu.swp.dorm_mnm.bed.bedService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import fu.swp.dorm_mnm.model.Bed;
import fu.swp.dorm_mnm.repository.base.BedRepository;
import fu.swp.dorm_mnm.service.baseImpl.BedServiceImpl;

@ExtendWith(MockitoExtension.class)
public class getBedById {

  @Mock
  private BedRepository bedRepository;

  @InjectMocks
  private BedServiceImpl bedServiceImpl;

  private List<Bed> expectedOutput;
  private List<Bed> actualInput;

  void setUp() {
    this.expectedOutput = new ArrayList<>();
    this.expectedOutput.add(new Bed().builder().bedId(1L).bedName("G505 - Bed 1").status("vacant").build());
    this.expectedOutput.add(new Bed().builder().bedId(1L).bedName("G505 - Bed 1").status("vacant").build());
    this.expectedOutput.add(new Bed().builder().bedId(1L).bedName("G505 - Bed 1").status("vacant").build());

    this.actualInput = new ArrayList<>();
    this.actualInput.add(new Bed().builder().bedId(1L).bedName("G505 - Bed 3").status("vacant").build());
    this.actualInput.add(new Bed().builder().bedId(1L).bedName("G505 - Bed 1").status("vacant").build());
    this.actualInput.add(new Bed().builder().bedId(1L).bedName("G505 - Bed 1").status("vacant").build());
  }

  @Test
  public void getBedByIdTC01() {
    setUp();
    int testCase = 0;

    Long bedId = expectedOutput.get(testCase).getBedId();
    when(bedRepository.findById(bedId)).thenReturn(Optional.of(actualInput.get(testCase)));
    System.out.println(bedServiceImpl.findById(bedId));
    Bed actualBed = bedServiceImpl.findById(bedId).get();

    assertEquals(expectedOutput.get(testCase).getBedId(), actualBed.getBedId());
    assertEquals(expectedOutput.get(testCase).getBedName(), actualBed.getBedName());
    assertEquals(expectedOutput.get(testCase).getStatus(), actualBed.getStatus());
  }

  @Test
  public void getBedByIdTC02() {
    setUp();
    int testCase = 1;

    Long bedId = expectedOutput.get(testCase).getBedId();
    when(bedRepository.findById(bedId)).thenReturn(Optional.of(actualInput.get(testCase)));
    System.out.println(bedServiceImpl.findById(bedId));
    Bed actualBed = bedServiceImpl.findById(bedId).get();

    assertEquals(expectedOutput.get(testCase).getBedId(), actualBed.getBedId());
    assertEquals(expectedOutput.get(testCase).getBedName(), actualBed.getBedName());
    assertEquals(expectedOutput.get(testCase).getStatus(), actualBed.getStatus());
  }

  @Test
  public void getBedByIdTC03() {
    setUp();
    int testCase = 2;

    Long bedId = expectedOutput.get(testCase).getBedId();
    when(bedRepository.findById(bedId)).thenReturn(Optional.of(actualInput.get(testCase)));
    System.out.println(bedServiceImpl.findById(bedId));
    Bed actualBed = bedServiceImpl.findById(bedId).get();

    assertEquals(expectedOutput.get(testCase).getBedId(), actualBed.getBedId());
    assertEquals(expectedOutput.get(testCase).getBedName(), actualBed.getBedName());
    assertEquals(expectedOutput.get(testCase).getStatus(), actualBed.getStatus());
  }

}
