package fu.swp.dorm_mnm.vnpay;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
public class TransactionDTO implements Serializable {
    private String status;
    private String message;
    private String data;
}
