package fu.swp.dorm_mnm.dto.base;

import fu.swp.dorm_mnm.model.Bed;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BedDto {
    private Long id;
    private String bedName;
    private String status;
    private Long roomId;
    private Long studentId;
    private String rollNumber;
    private String message;

    public BedDto(Bed bed) {
        this.id = bed.getBedId();
        this.bedName = bed.getBedName();
        this.status = bed.getStatus();
        this.roomId = bed.getRoom().getRoomId();
        this.rollNumber = bed.getStudent() != null ? bed.getStudent().getRollNumber() : null;
        this.studentId = bed.getStudent() != null ? bed.getStudent().getStudentId() : null;
    }

}
