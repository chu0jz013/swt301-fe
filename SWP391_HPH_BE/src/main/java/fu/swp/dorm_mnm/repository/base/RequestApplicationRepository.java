package fu.swp.dorm_mnm.repository.base;

import fu.swp.dorm_mnm.model.RequestApplication;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestApplicationRepository extends JpaRepository<RequestApplication, Long> {

    @Query(value = "SELECT * FROM hph_db.request_application\n"
            + "WHERE (:studentId is null or student_id = :studentId)\n"
            + "AND (:requestTypeId is null or request_application_type_id = :requestTypeId)\n"
            + "AND (:status is null or :status = '' or status = :status)", nativeQuery = true)
    Page<RequestApplication> findAllAppReq(@Param("studentId") Long studentId,
            @Param("requestTypeId") Long requestTypeId,
            @Param("status") String status,
            Pageable pageable);
}
