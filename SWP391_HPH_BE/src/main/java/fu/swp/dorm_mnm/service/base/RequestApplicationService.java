package fu.swp.dorm_mnm.service.base;

import java.util.Optional;

import org.springframework.data.domain.Pageable;

import fu.swp.dorm_mnm.dto.PageDto;
import fu.swp.dorm_mnm.dto.base.RequestApplicationDto;
import fu.swp.dorm_mnm.model.RequestApplication;

public interface RequestApplicationService {

    public Iterable<RequestApplication> findAll();

    public Optional<RequestApplication> findById(Long id);

    public RequestApplication save(RequestApplication studentRequest);

    public void remove(Long id);

    public PageDto<RequestApplicationDto> findAllReqApp(Long studentId, Long requestApplicationId, String status, Pageable pageable); 
}
