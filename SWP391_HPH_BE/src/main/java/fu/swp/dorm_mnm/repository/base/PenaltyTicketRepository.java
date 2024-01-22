package fu.swp.dorm_mnm.repository.base;

import fu.swp.dorm_mnm.model.PenaltyTicket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PenaltyTicketRepository extends JpaRepository<PenaltyTicket,Long> {
    Page<PenaltyTicket> findByTitleContaining(String title, Pageable pageable);
}
