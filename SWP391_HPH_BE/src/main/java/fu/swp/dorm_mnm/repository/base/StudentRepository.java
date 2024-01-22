package fu.swp.dorm_mnm.repository.base;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import fu.swp.dorm_mnm.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

     Optional<Student> findByUserId(Long userId);

     @Query(value = "SELECT s.* FROM student s " +
               "WHERE s.roll_number LIKE :rollNumber", nativeQuery = true)
     Optional<Student> findByRollNumber(String rollNumber);

     @Query(value = "SELECT s.* FROM student s \n" +
               "JOIN `user` u ON u.id = s.user_id \n" +
               "LEFT JOIN bed be ON be.student_id = s.student_id \n" +
               "LEFT JOIN room r ON r.room_id = be.room_id \n" +
               "LEFT JOIN building b ON r.building_id = b.building_id \n" +
               "WHERE (:bedId IS NULL OR be.bed_id = :bedId) \n" +
               "AND (:roomId IS NULL OR r.room_id = :roomId) \n" +
               "AND (:buildingId IS NULL OR b.building_id = :buildingId) \n" +
               "AND (:floor IS NULL OR r.floor = :floor) \n" +
               "AND (:rollNumber IS NULL OR :rollNumber LIKE '' OR s.roll_number LIKE :rollNumber )", countQuery = "SELECT COUNT(*) FROM student s \n"
                         +
                         "JOIN `user` u ON u.id = s.user_id \n" +
                         "LEFT JOIN bed be ON be.student_id = s.student_id \n" +
                         "LEFT JOIN room r ON r.room_id = be.room_id \n" +
                         "LEFT JOIN building b ON r.building_id = b.building_id \n" +
                         "WHERE (:bedId IS NULL OR be.bed_id = :bedId) \n" +
                         "AND (:roomId IS NULL OR r.room_id = :roomId) \n" +
                         "AND (:buildingId IS NULL OR b.building_id = :buildingId) \n" +
                         "AND (:floor IS NULL OR r.floor = :floor) \n" +
                         "AND (:rollNumber IS NULL OR :rollNumber LIKE '' OR s.roll_number LIKE :rollNumber ) ", nativeQuery = true)
     Page<Student> getAllStudentByFilter(
               @Param("rollNumber") String rollNumber,
               @Param("buildingId") Long buildingId,
               @Param("roomId") Long roomId,
               @Param("floor") Integer floor,
               @Param("bedId") Long bedId,
               Pageable pageable);
     Boolean existsByRollNumber(String rollNumber);
}
