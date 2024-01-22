package fu.swp.dorm_mnm.controller.base;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fu.swp.dorm_mnm.dto.base.PenaltyTicketDto;
import fu.swp.dorm_mnm.model.PenaltyTicket;
import fu.swp.dorm_mnm.service.base.GuardService;
import fu.swp.dorm_mnm.service.base.PenaltyTicketService;
import fu.swp.dorm_mnm.service.base.StudentService;

@RestController
@RequestMapping("/penalty-ticket")
public class PenaltyTicketController {

    @Autowired
    private PenaltyTicketService penaltyTicketService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private GuardService guardService;

    @PostMapping
    @PreAuthorize("hasAuthority('penalty-ticket:create')")
    public ResponseEntity<PenaltyTicket> createNewPenaltyTicket(@RequestBody PenaltyTicketDto penaltyTicketDto) {
        PenaltyTicket penaltyTicket = new PenaltyTicket();
        penaltyTicket.setStudent(studentService.findById(penaltyTicketDto.getStudentId()).get());
        penaltyTicket.setGuard(guardService.findById(penaltyTicketDto.getCreatedByGuardId()).get());
        penaltyTicket.setTitle(penaltyTicketDto.getTitle());
        penaltyTicket.setContent(penaltyTicketDto.getContent());
        penaltyTicket.setStatus(penaltyTicketDto.getStatus());
        penaltyTicket.setCreatedAt(new Date());
        penaltyTicket.setUpdatedAt(new Date());
        return new ResponseEntity<>(penaltyTicketService.save(penaltyTicket), HttpStatus.OK);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('penalty-ticket:read')")
    public ResponseEntity<List<PenaltyTicketDto>> getAllPenaltyTicket() {
        List<PenaltyTicket> penaltyTickets = penaltyTicketService.findAll();
        List<PenaltyTicketDto> penaltyTicketDtos = new ArrayList<>();
        for (PenaltyTicket penaltyTicket : penaltyTickets) {
            penaltyTicketDtos.add(new PenaltyTicketDto(penaltyTicket));
        }
        return new ResponseEntity<>(penaltyTicketDtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('penalty-ticket:read')")
    public ResponseEntity<PenaltyTicketDto> getPenaltyTicketById(@PathVariable Long id) {
        Optional<PenaltyTicket> penaltyTicketOptional = penaltyTicketService.findById(id);
        if (penaltyTicketOptional.isPresent()) {
            PenaltyTicket penaltyTicket = penaltyTicketOptional.get();
            return new ResponseEntity<>(new PenaltyTicketDto(penaltyTicket), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('penalty-ticket:update')")
    public ResponseEntity<PenaltyTicket> updateStatus(@PathVariable Long id, @RequestBody PenaltyTicket penaltyTicket) {
        Optional<PenaltyTicket> penaltyTicketOptional = penaltyTicketService.findById(id);
        if (penaltyTicketOptional.isPresent()) {
            PenaltyTicket penaltyTicketFinded = penaltyTicketOptional.get();
            penaltyTicketFinded.setStatus(penaltyTicket.getStatus());
            penaltyTicketService.save(penaltyTicketFinded);
            return new ResponseEntity<>(penaltyTicketFinded, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('penalty-ticket:delete')")
    public ResponseEntity<PenaltyTicket> deleteBedById(@PathVariable Long id) {
        Optional<PenaltyTicket> penaltyTicketOptional = penaltyTicketService.findById(id);
        return penaltyTicketOptional.map(penaltyTicket -> {
            penaltyTicketService.remove(id);
            return new ResponseEntity<>(penaltyTicket, HttpStatus.OK);
        }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Get All Paging
    // @GetMapping("/page")
    // @PreAuthorize("hasAuthority('penalty-ticket:read')")
    // public ResponseEntity<Page<PenaltyTicketDto>>
    // getAllPenaltyTicketPaged(Pageable pageable) {
    // Page<PenaltyTicket> penaltyTickets = penaltyTicketService.findAll(pageable);
    // Page<PenaltyTicketDto> penaltyTicketDtos =
    // penaltyTickets.map(PenaltyTicketDto::new);
    // return new ResponseEntity<>(penaltyTicketDtos, HttpStatus.OK);
    // }

    @GetMapping("/page")
    @PreAuthorize("hasAuthority('penalty-ticket:read')")
    public ResponseEntity<Page<PenaltyTicketDto>> getAllPenaltyTicketPaged(
            @RequestParam(value = "title", required = false) String title,
            Pageable pageable) {
        Page<PenaltyTicket> penaltyTickets;

        if (title != null && !title.isEmpty()) {
            penaltyTickets = penaltyTicketService.findByTitleContaining(title, pageable);
        } else {
            penaltyTickets = penaltyTicketService.findAll(pageable);
        }

        Page<PenaltyTicketDto> penaltyTicketDtos = penaltyTickets.map(PenaltyTicketDto::new);
        return new ResponseEntity<>(penaltyTicketDtos, HttpStatus.OK);
    }
}
