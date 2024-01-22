package fu.swp.dorm_mnm.service.baseImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import fu.swp.dorm_mnm.service.base.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

  @Autowired
  private JavaMailSender emailSender;

  @Override
  public void sendSimpleMessage(
    String from,  String to, String subject, String text) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom(from);
    message.setTo(to);
    message.setSubject(subject);
    message.setText(text);
    emailSender.send(message);
  }
}