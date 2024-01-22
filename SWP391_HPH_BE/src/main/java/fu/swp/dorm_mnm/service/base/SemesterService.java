package fu.swp.dorm_mnm.service.base;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import fu.swp.dorm_mnm.model.Semester;

public interface SemesterService {

    List<Semester> findAll();

    Optional<Semester> findById(Long id);

    Semester save(Semester semester);

    void remove(Long id);

    Semester getNextSemester(Date currentDate);
}
