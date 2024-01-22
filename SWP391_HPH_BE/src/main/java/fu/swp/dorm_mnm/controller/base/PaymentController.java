package fu.swp.dorm_mnm.controller.base;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fu.swp.dorm_mnm.dto.PageDto;
import fu.swp.dorm_mnm.dto.base.PaymentDto;
import fu.swp.dorm_mnm.model.Payment;
import fu.swp.dorm_mnm.service.base.PaymentService;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PutMapping("/{id}/check")
    @PreAuthorize("hasAuthority('bed-request:update')")
    public ResponseEntity<PaymentDto> checkPaymentBedRequest(@PathVariable Long id,
            @RequestParam(required = true) Long managerId) {
        Payment payment = paymentService.checkPaymentBedRequest(id, managerId);
        return payment != null ? new ResponseEntity<>(new PaymentDto(payment), HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/{id}/uncheck")
    @PreAuthorize("hasAuthority('bed-request:update')")
    public ResponseEntity<PaymentDto> unCheckPaymentBedRequest(@PathVariable Long id,
            @RequestParam(required = true) Long managerId) {
        Payment payment = paymentService.unCheckPaymentBedRequest(id, managerId);
        return payment != null ? new ResponseEntity<>(new PaymentDto(payment), HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('bed-request:read')")
    public ResponseEntity<PageDto<PaymentDto>> getAllPaymentByFilter(
            @RequestParam(required = false) String rollNumber,
            @RequestParam(required = false) String status1,
            @RequestParam(required = false) String status2,
            @RequestParam(defaultValue = "0") int pageNo) {

        Pageable pageable = PageRequest.of(pageNo, 8, Sort.by("created_at").descending());

        PageDto<PaymentDto> resp = paymentService.getAllPaymentByFilter(rollNumber, status1, status2, pageable);

        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

}
