package fu.swp.dorm_mnm.repository.base;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import fu.swp.dorm_mnm.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    @Query(value = "SELECT * FROM role WHERE role_name = :roleName", nativeQuery = true)
    public Role findByRoleName(@Param("roleName") String roleName);

}
