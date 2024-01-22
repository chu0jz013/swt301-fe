package fu.swp.dorm_mnm.repository.base;

import fu.swp.dorm_mnm.model.BedRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BedRequestRepository extends JpaRepository<BedRequest, Long> {
        @Query(value = "SELECT * FROM bed_request WHERE (:status is null or status = :status)" +
                        "AND student_id=:studentId", countQuery = "SELECT count(*) FROM bed_request WHERE (:status is null or status = :status)"
                                        +
                                        "AND student_id=:studentId", nativeQuery = true)
        Page<BedRequest> listBedRequest(@Param("status") String status, @Param("studentId") Long studentId,
                        Pageable pageable);

        @Query(value = "SELECT br.* FROM bed_request br\n" +
                        "JOIN student s on s.student_id = br.student_id\n" +
                        "JOIN semester se on se.semester_id = br.semester_id\n" +
                        "WHERE (:status IS NULL OR `status` = :status)\n" +
                        "  AND (:studentRollNumber IS NULL OR :studentRollNumber = '' OR s.roll_number LIKE :studentRollNumber)\n"
                        +
                        "  AND (:semesterId IS NULL OR se.semester_id = :semesterId)", countQuery = "SELECT count(*) FROM bed_request br\n"
                                        +
                                        "JOIN student s on s.student_id = br.student_id\n" +
                                        "JOIN semester se on se.semester_id = br.semester_id\n" +
                                        "WHERE (:status IS NULL OR `status` = :status)\n" +
                                        "  AND (:studentRollNumber IS NULL OR :studentRollNumber = '' OR s.roll_number LIKE :studentRollNumber)\n"
                                        +
                                        "  AND (:semesterId IS NULL OR se.semester_id = :semesterId)", nativeQuery = true)
        Page<BedRequest> getAllBedRequest(@Param("status") String status,
                        @Param("studentRollNumber") String studentRollNumber,
                        @Param("semesterId") Long semesterId, Pageable pageable);

                        

}
