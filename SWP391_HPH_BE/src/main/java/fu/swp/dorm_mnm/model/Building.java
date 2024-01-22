package fu.swp.dorm_mnm.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "building")
public class Building {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "building_id")
    private Long buildingId;

    @Column(name = "building_name")
    private String buildingName;

    @Column(name = "number_floor")
    private Integer numberFloor;

    @JsonIgnore
    @OneToMany(mappedBy = "building", targetEntity = Room.class, fetch = FetchType.LAZY)
    // @JsonBackReference
    private List<Room> rooms;

    @JsonIgnore
    @OneToMany(mappedBy = "building", targetEntity = GuardShift.class, fetch = FetchType.LAZY)
    // @JsonBackReference
    private List<GuardShift> GuardShifts;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at")
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    private Date updatedAt;
}
