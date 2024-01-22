package fu.swp.dorm_mnm.service.base;

import java.util.List;
import java.util.Optional;

import fu.swp.dorm_mnm.model.Guard;

public interface GuardService {
    List<Guard> findAll();

    Optional<Guard> findById(Long id);

    Guard save(Guard guard);

    void remove(Long id);

    public Guard getGuardByUserId(Integer userId);
}
