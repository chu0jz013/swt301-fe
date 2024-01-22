package fu.swp.dorm_mnm.repository.base;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fu.swp.dorm_mnm.model.Building;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {
    List<Building> findAll();
}
