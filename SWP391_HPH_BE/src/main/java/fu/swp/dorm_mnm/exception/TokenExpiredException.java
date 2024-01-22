package fu.swp.dorm_mnm.exception;

public class TokenExpiredException extends RuntimeException {
    public TokenExpiredException(String message) {
        super(message);
        
    }
}
