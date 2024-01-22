package fu.swp.dorm_mnm.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long studentId;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "student", targetEntity = BedRequest.class)
    private List<BedRequest> bedRequests;

    @JsonIgnore
    @OneToMany(mappedBy = "student", targetEntity = Payment.class)
    private List<Payment> payments;

    @JsonIgnore
    @OneToOne(mappedBy = "student", targetEntity = Bed.class)
    private Bed bed;

    @Column(name = "parent_name", nullable = false, length = 100)
    private String parentName;

    @Column(name = "description", length = 200)
    private String description;

    @Column(name = "roll_number", unique = true, columnDefinition = "VARCHAR(8)")
    private String rollNumber;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at")
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    private Date updatedAt;
}
