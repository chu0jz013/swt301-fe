package fu.swp.dorm_mnm.service.base;

public interface EmailService {
    void sendSimpleMessage(String from, String to, String subject, String text);
}
