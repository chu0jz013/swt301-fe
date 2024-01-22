package fu.swp.dorm_mnm.dto.base;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import fu.swp.dorm_mnm.model.BedRequest;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class BedRequestDto {
    private Long bedRequestId;
    private String bedName;
    private String semesterName;
    private String buildingName;
    private String roomName;
    private String roomTypeName;
    private String status;
    private String createdAt;
    private String updatedAt;
    private String studentRollNumber;
    private Long studentId;
    private Long floor;
    

    public BedRequestDto(BedRequest bedRequest) {
        String pattern = "dd/MM/yyyy HH:mm:ss";
        DateFormat df = new SimpleDateFormat(pattern);
        this.bedRequestId = bedRequest.getBedRequestId();
        this.status = bedRequest.getStatus();
        this.roomTypeName = bedRequest.getBed().getRoom().getRoomType().getRoomTypeName();
        this.roomName = bedRequest.getBed().getRoom().getRoomName();
        this.buildingName = bedRequest.getBed().getRoom().getBuilding().getBuildingName();
        this.semesterName = bedRequest.getSemester().getSemesterName();
        this.createdAt = bedRequest.getCreatedAt() != null ? df.format(bedRequest.getCreatedAt()) : null;
        this.updatedAt = bedRequest.getUpdatedAt() != null ? df.format(bedRequest.getUpdatedAt()) : null;
        this.floor = bedRequest.getBed() != null ? bedRequest.getBed().getRoom().getFloor() : null;
        this.studentId = bedRequest.getStudent().getStudentId();
        this.bedName = bedRequest.getBed().getBedName();
        this.studentRollNumber = bedRequest.getStudent().getRollNumber();
    }
}
