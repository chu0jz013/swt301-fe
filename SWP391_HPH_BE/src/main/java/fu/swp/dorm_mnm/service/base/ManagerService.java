package fu.swp.dorm_mnm.service.base;

import org.springframework.data.domain.Pageable;

import fu.swp.dorm_mnm.dto.PageDto;
import fu.swp.dorm_mnm.dto.base.ManagerDto;

public interface ManagerService {
    public PageDto<ManagerDto> findAll(Pageable pageable);
}
