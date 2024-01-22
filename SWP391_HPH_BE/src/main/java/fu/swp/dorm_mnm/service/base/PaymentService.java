package fu.swp.dorm_mnm.service.base;

import java.util.Optional;

import org.springframework.data.domain.Pageable;

import fu.swp.dorm_mnm.dto.PageDto;
import fu.swp.dorm_mnm.dto.base.PaymentDto;
import fu.swp.dorm_mnm.model.Payment;

public interface PaymentService {

    public Iterable<Payment> findAll();

    public Optional<Payment> findById(Long id);

    public Payment save(Payment payment);

    public void remove(Long id);

    public PageDto<PaymentDto> findByUserId(Long userId, Pageable pageable);

    public Payment checkPaymentBedRequest(Long id, Long managerId);

    public Payment unCheckPaymentBedRequest(Long id, Long managerId);

    public PageDto<PaymentDto> getAllPaymentByFilter(String rollNumber, String status1, String status2, Pageable pageable);

}
