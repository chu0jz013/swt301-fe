package fu.swp.dorm_mnm.dto.base;

import fu.swp.dorm_mnm.model.PenaltyTicket;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

@Getter
@Setter
@NoArgsConstructor
public class PenaltyTicketDto {
    private Long penaltyTicketId;
    private String title;
    private String content;
    private String status;
    private String createdAt;
    private String updatedAt;
    private Long createdByGuardId;
    private Long studentId;

    public PenaltyTicketDto(PenaltyTicket penaltyTicket) {
        String pattern = "dd/MM/yyyy HH:mm:ss";
        DateFormat df = new SimpleDateFormat(pattern);

        this.createdAt = df.format(penaltyTicket.getCreatedAt());
        this.updatedAt = df.format(penaltyTicket.getUpdatedAt());
        this.penaltyTicketId = penaltyTicket.getPenaltyTicketId();
        this.title = penaltyTicket.getTitle();
        this.content = penaltyTicket.getContent();
        this.status = penaltyTicket.getStatus();
        this.createdByGuardId = penaltyTicket.getGuard().getGuardId();
        this.studentId = penaltyTicket.getStudent().getStudentId();
    }
}
