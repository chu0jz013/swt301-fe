package fu.swp.dorm_mnm.repository.base;

import fu.swp.dorm_mnm.model.Guard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GuardRepository extends JpaRepository<Guard, Long> {
    @Query("SELECT g FROM Guard g WHERE g.user.id = :userId")
    Guard findByUserId(@Param("userId") Integer userId);
}
