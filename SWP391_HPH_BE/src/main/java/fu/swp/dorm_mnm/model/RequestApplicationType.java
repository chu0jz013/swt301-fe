package fu.swp.dorm_mnm.model;

import jakarta.persistence.*;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "request_application_type")
public class RequestApplicationType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_application_type_id")
    private Long requestApplicationTypeId;

    @Column(name = "request_application_type_name", length = 300)
    private String requestApplicationTypeName;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    // Constructors, getters, and setters

}
