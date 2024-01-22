package fu.swp.dorm_mnm.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class WrongOldPasswordException {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleInvalidPasswordException(ResourceNotFoundException ex){
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}
