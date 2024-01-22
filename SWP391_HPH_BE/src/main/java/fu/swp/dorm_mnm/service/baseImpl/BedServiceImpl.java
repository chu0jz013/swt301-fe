package fu.swp.dorm_mnm.service.baseImpl;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;

import fu.swp.dorm_mnm.model.Student;
import fu.swp.dorm_mnm.repository.base.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fu.swp.dorm_mnm.dto.base.BedDto;
import fu.swp.dorm_mnm.model.Bed;
import fu.swp.dorm_mnm.model.Room;
import fu.swp.dorm_mnm.repository.base.BedRepository;
import fu.swp.dorm_mnm.repository.base.RoomRepository;
import fu.swp.dorm_mnm.service.base.BedService;

@Service
public class BedServiceImpl implements BedService {

    @Autowired
    private BedRepository bedRepository;

    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Iterable<Bed> findAll() {
        return bedRepository.findAll();
    }

    @Override
    public Optional<Bed> findById(Long id) {
        return bedRepository.findById(id);
    }

    @Override
    public Bed save(Bed bed) {
        return bedRepository.save(bed);
    }

    @Override
    public void remove(Long id) {
        bedRepository.deleteById(id);
    }

    @Override
    public BedDto updateBedOccupation(Long bedId, String rollNumber) {
        BedDto resp=new BedDto();
        if(rollNumber==null||rollNumber.isEmpty()){
            Bed bed=bedRepository.findById(bedId).get();
            resp.setMessage("Student "+bed.getStudent().getRollNumber()+" have been removed from bed "+bedId);
            bed.setStudent(null);
            bed.setStatus("vacant");
            Bed updatedBed=bedRepository.save(bed);
            resp.setBedName(updatedBed.getBedName());
            resp.setId(updatedBed.getBedId());
            resp.setStatus(updatedBed.getStatus());
            resp.setRoomId(updatedBed.getRoom().getRoomId());
            resp.setRollNumber(null);
            resp.setStudentId(null);
            return resp;
        }
        boolean isRollNumberExist=studentRepository.existsByRollNumber(rollNumber);
        if(!isRollNumberExist){
            resp.setMessage("Student "+rollNumber+" not exists !");
            return resp;
        }
        Student st=studentRepository.findByRollNumber(rollNumber).get();
        if (st.getBed()!=null) {
            resp.setMessage("Student "+rollNumber+" is already in bed "+st.getBed().getBedName()+"!");
            return resp;
        }

            Bed bed=bedRepository.findById(bedId).get();
            bed.setStudent(st);
            bed.setStatus("occupied");
            Bed updatedBed=bedRepository.save(bed);
            resp.setBedName(updatedBed.getBedName());
            resp.setId(updatedBed.getBedId());
            resp.setStatus(updatedBed.getStatus());
            resp.setRoomId(updatedBed.getRoom().getRoomId());
            resp.setRollNumber(rollNumber);
            resp.setStudentId(null);
            resp.setMessage("Student "+rollNumber+" have been assigned to bed "+bed.getBedName()+" successfully");
            return resp;

    }

    @Override
    public BedDto createBed(BedDto bedto) {
        LocalDateTime now = LocalDateTime.now();
        Timestamp sqlNow = Timestamp.valueOf(now);
        Room room = roomRepository.findById(bedto.getRoomId()).get();

        Bed bed = new Bed();
        bed.setBedName(bedto.getBedName());
        bed.setCreatedAt(sqlNow);
        bed.setUpdatedAt(sqlNow);
        bed.setRoom(room);
        bed.setStatus("Vacant");

        return new BedDto(bedRepository.save(bed));
    }
}
