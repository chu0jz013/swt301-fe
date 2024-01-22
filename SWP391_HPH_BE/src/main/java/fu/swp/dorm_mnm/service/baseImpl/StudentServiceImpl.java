package fu.swp.dorm_mnm.service.baseImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import fu.swp.dorm_mnm.dto.PageDto;
import fu.swp.dorm_mnm.dto.base.StudentDto;
import fu.swp.dorm_mnm.model.Student;
import fu.swp.dorm_mnm.repository.base.StudentRepository;
import fu.swp.dorm_mnm.service.base.StudentService;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Iterable<Student> findAll() {
        return studentRepository.findAll();
    }

    @Override
    public Optional<Student> findById(Long id) {
        return studentRepository.findById(id);
    }

    @Override
    public Optional<Student> findByUserId(Long id) {
        return studentRepository.findByUserId(id);
    }

    @Override
    public Student save(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public void remove(Long id) {
        studentRepository.deleteById(id);
    }

    @Override
    public StudentDto findByRollNumberDto(String rollNumber) {
        Optional<Student> student = studentRepository.findByRollNumber(rollNumber);
        return student.isPresent() ? new StudentDto(student.get()) : null;
    }

    @Override
    public Student findByRollNumber(String rollNumber) {
        Optional<Student> student = studentRepository.findByRollNumber(rollNumber);
        return student.isPresent() ? student.get() : null;
    }

    @Override
    public PageDto<StudentDto> findAllByFilter(String rollNumber, Long buildingId, Long roomId, Integer floor,
            Long bedId, Pageable pageable) {

        Page<Student> page = studentRepository.getAllStudentByFilter(rollNumber, buildingId, roomId, floor, bedId,
                pageable);
        List<StudentDto> studentDtoList = new ArrayList<>();

        for (Student student : page.getContent()) {
            studentDtoList.add(new StudentDto(student));
        }

        PageDto<StudentDto> pageDto = new PageDto<>();
        pageDto.setData(studentDtoList);
        pageDto.setTotalPages(page.getTotalPages());
        pageDto.setTotalItems(page.getTotalElements());
        pageDto.setCurrentPage(page.getNumber());

        return pageDto;
    }

    @Override
    public StudentDto save(StudentDto studentDto) {
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }

}
