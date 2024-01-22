package fu.swp.dorm_mnm.service.base;

import java.util.Optional;

import fu.swp.dorm_mnm.dto.base.BedDto;
import fu.swp.dorm_mnm.model.Bed;

public interface BedService {

    public BedDto createBed(BedDto bedto);

    public Iterable<Bed> findAll();

    public Optional<Bed> findById(Long id);

    public Bed save(Bed bed);

    public void remove(Long id);
    public BedDto updateBedOccupation(Long bedId,String rollNumber);

}
