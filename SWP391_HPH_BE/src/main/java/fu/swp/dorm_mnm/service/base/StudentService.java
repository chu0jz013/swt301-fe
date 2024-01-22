package fu.swp.dorm_mnm.service.base;

import java.util.Optional;

import org.springframework.data.domain.Pageable;

import fu.swp.dorm_mnm.dto.PageDto;
import fu.swp.dorm_mnm.dto.base.StudentDto;
import fu.swp.dorm_mnm.model.Student;

public interface StudentService {

    public Iterable<Student> findAll();

    public Optional<Student> findById(Long id);

    public Student save(Student student);

    public StudentDto save(StudentDto studentDto);

    public void remove(Long id);

    public Optional<Student> findByUserId(Long id);

    public StudentDto findByRollNumberDto(String rollNumber);

    public Student findByRollNumber(String rollNumber);

    public PageDto<StudentDto> findAllByFilter(String rollNumber, Long buildingId, Long roomId, Integer floor,
            Long bedId, Pageable pageable);
}
