package fu.swp.dorm_mnm.dto.base;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import fu.swp.dorm_mnm.model.Manager;
import fu.swp.dorm_mnm.model.Payment;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class PaymentDto {

    private Long paymentId;
    private Long managerId;
    private Long studentId;
    private float amount;
    private String createdAt;
    private String updatedAt;
    private Long bedRequestId;
    private String status;
    private String managerName;
    private String studentRollNumber;
    private String expirationDate;

    public String vnp_OrderInfo = "Parrot";
    public String vnp_OrderType = "200000";
    public String vnp_TxnRef;

    public PaymentDto(Payment payment) {
        String pattern = "dd/MM/yyyy HH:mm:ss";
        DateFormat df = new SimpleDateFormat(pattern);
        this.paymentId = payment.getPaymentId();
        this.managerId = payment.getManager() != null ? payment.getManager().getManagerId() : null;
        this.studentId = payment.getStudent().getStudentId();
        this.studentRollNumber = payment.getStudent().getRollNumber();
        this.bedRequestId = payment.getBedRequest().getBedRequestId();
        this.amount = payment.getAmount();
        this.expirationDate = df.format(payment.getExpirationDate());
        this.createdAt = df.format(payment.getCreatedAt());
        this.updatedAt = df.format(payment.getUpdatedAt());

        Manager manager = payment.getManager();
        this.managerName = manager != null ? manager.getUser().getFullName() : null;

        this.setStatus(payment.getStatus());
    }
}
