package fu.swp.dorm_mnm.vnpay;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import fu.swp.dorm_mnm.dto.base.PaymentDto;
import fu.swp.dorm_mnm.service.base.PaymentService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value = "/vnpay")
public class VnPayController {

    @Autowired
    private PayService payService;

    @Autowired
    PaymentService paymentService;

    public VnPayController(PayService payService) {
        this.payService = payService;
    }

    @PostMapping("/payment")
    public String pay(@RequestBody PaymentDto paymentDto, HttpServletRequest request) {
        try {
            return payService.payWithVNPAY(paymentDto, request);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/payment_infor")
    public RedirectView transaction(
            @RequestParam(value = "vnp_Amount") Double amount,
            @RequestParam(value = "vnp_BankCode") String bankCode,
            @RequestParam(value = "vnp_ResponseCode") String responseCode,
            @RequestParam(value = "vnp_TxnRef") String txnRef) {
        String orderIdByUsingLongDataType = txnRef.substring(0, txnRef.length() - 8);
        long result = Long.parseLong(orderIdByUsingLongDataType);
        if ("00".equals(responseCode)) {

            // Trạng thái thành công

            // payService.changeStatus(result);
            return new RedirectView("http://localhost:3000/paid-success");

            // Redirect to the specified URL when the condition is met
        } else {
            // orderService.removeOrder(result);
            // Trạng thái thất bại
            return new RedirectView("http://localhost:3000/error");
        }
    }

}
