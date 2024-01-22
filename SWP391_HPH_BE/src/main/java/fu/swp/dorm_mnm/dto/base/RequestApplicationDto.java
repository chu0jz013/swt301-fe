package fu.swp.dorm_mnm.dto.base;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import fu.swp.dorm_mnm.model.Manager;
import fu.swp.dorm_mnm.model.RequestApplication;
import fu.swp.dorm_mnm.model.Student;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestApplicationDto {
    private Long requestApplicationId;
    private String studentName;
    private Long requestApplicationTypeId;
    private String requestApplicationTypeName;
    private String textResponse;
    private String createdAt;
    private String updatedAt;
    private String requestContent;
    private String status;

    private Student student;
    private Manager manager;

    public RequestApplicationDto(RequestApplication requestApplication) {
        String pattern = "dd/MM/yyyy HH:mm:ss";
        DateFormat df = new SimpleDateFormat(pattern);

        this.requestApplicationId = requestApplication.getRequestApplicationId();
        this.studentName = requestApplication.getStudent().getUser().getFullName();
        this.requestApplicationTypeId = requestApplication.getRequestApplicationType().getRequestApplicationTypeId();
        this.requestApplicationTypeName = requestApplication.getRequestApplicationType()
                .getRequestApplicationTypeName();
        this.textResponse = requestApplication.getTextResponse() != null ? requestApplication.getTextResponse() : "N/A";
        this.createdAt = requestApplication.getCreatedAt() != null ? df.format(requestApplication.getCreatedAt()) : null;
        this.updatedAt = requestApplication.getUpdatedAt() != null ? df.format(requestApplication.getUpdatedAt()) : null;
        this.requestContent = requestApplication.getRequestContent();
        this.status = requestApplication.getStatus();

        this.student = requestApplication.getStudent() != null ? requestApplication.getStudent() : null;
        this.manager = requestApplication.getManager() != null ? requestApplication.getManager() : null;
    }

}
