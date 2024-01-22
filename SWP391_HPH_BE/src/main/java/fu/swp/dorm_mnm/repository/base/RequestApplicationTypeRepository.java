package fu.swp.dorm_mnm.repository.base;

import fu.swp.dorm_mnm.model.RequestApplicationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestApplicationTypeRepository extends JpaRepository<RequestApplicationType, Long> {

}
