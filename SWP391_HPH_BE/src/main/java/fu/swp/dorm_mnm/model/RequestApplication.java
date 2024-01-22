package fu.swp.dorm_mnm.model;

import jakarta.persistence.*;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "request_application")
public class RequestApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_application_id")
    private Long requestApplicationId;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "take_by_manager_id")
    private Manager manager;

    @ManyToOne
    @JoinColumn(name = "request_application_type_id")
    private RequestApplicationType requestApplicationType;

    @Column(name = "text_response", columnDefinition = "TEXT")
    private String textResponse;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    @Column(name = "request_content", columnDefinition = "text")
    private String requestContent;

    @Column(name = "status")
    private String status;

}