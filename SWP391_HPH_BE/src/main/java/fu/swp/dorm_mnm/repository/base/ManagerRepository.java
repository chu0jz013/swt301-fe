package fu.swp.dorm_mnm.repository.base;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fu.swp.dorm_mnm.model.Manager;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, Long> {
    @Override
    Page<Manager> findAll(Pageable pageable);
}
