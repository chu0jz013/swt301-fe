package fu.swp.dorm_mnm.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "guard_shift")
public class GuardShift {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "guard_shift_id")
    private Long guardShiftId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    // @JsonManagedReference
    @JoinColumn(name = "building")
    private Building building;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    // @JsonManagedReference
    @JoinColumn(name = "guard_id")
    private Guard guard;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    // @JsonManagedReference
    @JoinColumn(name = "assign_by_manager_id")
    private Manager manager;

    @Column(name = "start_date_time")
    private Date startDate;

    @Column(name = "end_date_time")
    private Date endDate;

    @Column(name = "slot")
    private Integer slot;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at")
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    private Date updatedAt;
}
