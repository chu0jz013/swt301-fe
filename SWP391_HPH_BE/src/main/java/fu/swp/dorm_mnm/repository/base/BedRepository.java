package fu.swp.dorm_mnm.repository.base;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fu.swp.dorm_mnm.model.Bed;

@Repository
public interface BedRepository extends JpaRepository<Bed, Long> {

}
