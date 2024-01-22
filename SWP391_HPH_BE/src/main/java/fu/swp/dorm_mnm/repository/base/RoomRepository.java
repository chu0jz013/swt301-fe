package fu.swp.dorm_mnm.repository.base;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import fu.swp.dorm_mnm.model.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

        @Query(value = "SELECT * FROM room r WHERE r.building_id = :buildingId", nativeQuery = true)
        public List<Room> getRoomsByBuildingId(@Param("buildingId") Long buildingId);

        @Query(value = "SELECT * FROM room r WHERE r.room_type_id = :roomTypeId", nativeQuery = true)
        public List<Room> getRoomsByRoomTypeId(@Param("roomTypeId") Long roomTypeId);

        @Query(value = "SELECT r.* FROM room r " +
                        "JOIN building b ON b.building_id = r.building_id " +
                        "JOIN room_type rt ON rt.room_type_id = r.room_type_id  " +
                        "JOIN bed be ON r.room_id = be.room_id " +
                        "WHERE (:buildingId is NULL or b.building_id = :buildingId) " +
                        "AND (:roomTypeId is NULL or rt.room_type_id = :roomTypeId) " +
                        "AND (:floor is NULL or r.floor = :floor) " +
                        "AND (:status is NULL or :status LIKE '' or be.`status` = :status) " +
                        "GROUP BY r.room_id;", nativeQuery = true)
        public List<Room> getRoomsByRoomTypeIdBuildingIdFloorStatus(@Param("roomTypeId") Long roomTypeId,
                        @Param("buildingId") Long buildingId, @Param("floor") Integer floor,
                        @Param("status") String status);

        @Query(value = "SELECT r.* FROM room r " +
                        "JOIN building b ON b.building_id = r.building_id " +
                        "JOIN room_type rt ON rt.room_type_id = r.room_type_id  " +
                        "JOIN bed be ON r.room_id = be.room_id " +
                        "WHERE (:buildingId is NULL or b.building_id = :buildingId) " +
                        "AND (:roomTypeId is NULL or rt.room_type_id = :roomTypeId) " +
                        "AND (:floor is NULL or r.floor = :floor) " +
                        "AND (:status is NULL or :status LIKE '' or be.`status` = :status) " +
                        "GROUP BY r.room_id;", countQuery = "SELECT COUNT(*) FROM room r " +
                                        "JOIN building b ON b.building_id = r.building_id " +
                                        "JOIN room_type rt ON rt.room_type_id = r.room_type_id  " +
                                        "JOIN bed be ON r.room_id = be.room_id " +
                                        "WHERE (:buildingId is NULL or b.building_id = :buildingId) " +
                                        "AND (:roomTypeId is NULL or rt.room_type_id = :roomTypeId) " +
                                        "AND (:floor is NULL or r.floor = :floor) " +
                                        "AND (:status is NULL or :status LIKE '' or be.`status` = :status) " +
                                        "GROUP BY r.room_id;", nativeQuery = true)
        public Page<Room> getRoomPageByParam(@Param("roomTypeId") Long roomTypeId,
                        @Param("buildingId") Long buildingId, @Param("floor") Integer floor,
                        @Param("status") String status, Pageable pageable);

        @Query(value = "select r.* from bed_request br"
                        + "\ninner join bed b on br.bed_id = b.bed_id"
                        + "\ninner join room r on b.room_id = r.room_id"
                        + "\nWHERE br.semester_id = :semester"
                        + "\nAND br.status = 'approved'"
                        + "\nAND (:floor is null or r.floor = :floor)"
                        + "\nAND (:building is null or r.building_id = :building)"
                        + "\nAND (:roomType is null or r.room_type_id = :roomType);", nativeQuery = true)
        Page<Room> getAllRoomForManager(@Param("semester") Long semesterId,
                        @Param("building") Long buildingId,
                        @Param("roomType") Long roomTypeId,
                        @Param("floor") Long floor,
                        Pageable pageable);
}
