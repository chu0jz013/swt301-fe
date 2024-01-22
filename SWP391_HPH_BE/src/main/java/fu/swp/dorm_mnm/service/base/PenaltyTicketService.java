package fu.swp.dorm_mnm.service.base;

import fu.swp.dorm_mnm.model.PenaltyTicket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface PenaltyTicketService {

    public Page<PenaltyTicket> findAll(Pageable pageable);

    public List<PenaltyTicket> findAll();

    public Optional<PenaltyTicket> findById(Long id);

    public PenaltyTicket save(PenaltyTicket penaltyTicket);

    public void remove(Long id);

    public Page<PenaltyTicket> findByTitleContaining(String title, Pageable pageable);
}
