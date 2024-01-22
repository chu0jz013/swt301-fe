package fu.swp.dorm_mnm.service.base;

import java.util.Optional;

import org.springframework.data.domain.Pageable;

import fu.swp.dorm_mnm.dto.PageDto;
import fu.swp.dorm_mnm.dto.base.BedRequestDto;
import fu.swp.dorm_mnm.model.BedRequest;

public interface BedRequestService {

    public Iterable<BedRequest> findAll();

    public Optional<BedRequest> findById(Long id);

    public BedRequestDto createTicket(Long studentId, Long bedId, Long semesterId);

    public BedRequest save(BedRequest bedRequest);

    public void remove(Long id);

    public BedRequestDto bookBed(Long studentId, Long bedId, Long semesterId);

    public PageDto<BedRequestDto> findByUserId(String status, Long userId, Pageable pageable);

    public void scanForExpiredPayment();

    public void deleteExpiredPayment();

    public PageDto<BedRequestDto> getAllBedRequest(String studentRollNumber, String status, Long semesterId,
            Pageable pageable);
}
