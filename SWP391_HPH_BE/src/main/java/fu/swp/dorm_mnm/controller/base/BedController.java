package fu.swp.dorm_mnm.controller.base;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import fu.swp.dorm_mnm.dto.base.BedDto;
import fu.swp.dorm_mnm.exception.ResourceNotFoundException;
import fu.swp.dorm_mnm.model.Bed;
import fu.swp.dorm_mnm.service.base.BedService;

@RestController
@RequestMapping("/bed")
public class BedController {

    @Autowired
    private BedService bedService;

    @PostMapping
    @PreAuthorize("hasAuthority('bed:create')")
    public ResponseEntity<BedDto> createNewBed(@RequestBody BedDto bedto) {
        BedDto resp = bedService.createBed(bedto);
        return new ResponseEntity<>(resp, HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('bed:read')")
    public ResponseEntity<Iterable<Bed>> getAllBed() {
        return new ResponseEntity<>(bedService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('bed:read')")
    public ResponseEntity<Bed> getBedById(@PathVariable Long id) {
        Optional<Bed> bedOptional = bedService.findById(id);
        return bedOptional.map(bed -> new ResponseEntity<>(bed, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('bed:update')")
    public ResponseEntity<Bed> updateStatus(@PathVariable Long id, @RequestBody Bed bed) {
        Bed bed2 = bedService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));

        bedService.save(bed);
        return ResponseEntity.ok(bed);
    }
    @PutMapping("/{bedId}/move-student")
    @PreAuthorize("hasAuthority('bed:update')")
    public ResponseEntity<BedDto> updateStatus(@PathVariable Long bedId, @RequestParam(required = false) String rollNumber) {
        BedDto bedDto=bedService.updateBedOccupation(bedId,rollNumber);
        return ResponseEntity.ok(bedDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('bed:delete')")
    public ResponseEntity<String> deleteBedById(@PathVariable Long id) {
        Optional<Bed> bedOptional = bedService.findById(id);
        return bedOptional.map(bed -> {
            bedService.remove(id);
            return new ResponseEntity<>("Bed id: " + id + " was deleted!", HttpStatus.OK);
        }).orElseGet(() -> new ResponseEntity<>("BED NOT FOUND", HttpStatus.NOT_FOUND));
    }

    @PostMapping("/add-beds")
    @PreAuthorize("hasAuthority('bed:create')")
    public ResponseEntity<List<BedDto>> createBedByRoomId(@RequestBody List<BedDto> bedDtoList) {
        List<BedDto> resp = new ArrayList<>();

        for (BedDto b : bedDtoList) {
            resp.add(bedService.createBed(b));
        }

        return new ResponseEntity<>(resp, HttpStatus.CREATED);
    }

}
