package fu.swp.dorm_mnm.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

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
@Table(name = "manager")
public class Manager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "manager_id")
    private Long managerId;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @Column(name = "description", length = 200)
    private String description;

    @JsonIgnore
    @OneToMany(mappedBy = "manager", targetEntity = News.class, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<News> news;

    @JsonIgnore
    @JsonBackReference
    @OneToMany(mappedBy = "manager", targetEntity = GuardShift.class, fetch = FetchType.LAZY)
    private List<GuardShift> guardShifts;

    @JsonIgnore
    @OneToMany(mappedBy = "manager", targetEntity = RequestApplication.class, fetch = FetchType.LAZY)
    private List<RequestApplication> requestApplications;

    @JsonIgnore
    @OneToMany(mappedBy = "manager", targetEntity = MaintenanceReport.class, fetch = FetchType.LAZY)
    private List<MaintenanceReport> maintenanceReports;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at")
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    private Date updatedAt;

    // Constructors, getters, and setters
}
