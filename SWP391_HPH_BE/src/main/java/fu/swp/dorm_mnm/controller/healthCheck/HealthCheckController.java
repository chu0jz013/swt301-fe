package fu.swp.dorm_mnm.controller.healthCheck;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fu.swp.dorm_mnm.model.Semester;
import fu.swp.dorm_mnm.service.base.SemesterService;

@RestController
@RequestMapping("/health-check")
public class HealthCheckController {

    @Autowired
    private SemesterService semesterService;

    @GetMapping
    public ResponseEntity<HashMap<String, String>> healthCheck() {
        HashMap<String, String> response = new HashMap<>();
        response.put("status", "unhealthy");
        try {
            List<Semester> semesters = semesterService.findAll();
            response.clear();

            response.put("check db", semesters.get(0).getSemesterName());
            response.put("status", "healthy");
        } catch (Exception error) {
            response.clear();
            response.put("status", "unhealthy");
            response.put("error", error + "");
        }
        return ResponseEntity.ok(response);
    }
}