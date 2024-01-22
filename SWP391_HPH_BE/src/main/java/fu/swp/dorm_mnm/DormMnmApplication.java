package fu.swp.dorm_mnm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DormMnmApplication {

	public static void main(String[] args) {
		SpringApplication.run(DormMnmApplication.class, args);
	}

}
