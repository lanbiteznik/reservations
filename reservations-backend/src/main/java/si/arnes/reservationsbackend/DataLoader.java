package si.arnes.reservationsbackend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import si.arnes.reservationsbackend.models.Reservation;
import si.arnes.reservationsbackend.repository.ReservationRepository;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(ReservationRepository repository) {
        return args -> {
            repository.save(new Reservation("Meeting A", convertToDate(LocalDateTime.now()), convertToDate(LocalDateTime.now().plusHours(2))));
            repository.save(new Reservation("Meeting B", convertToDate(LocalDateTime.now().plusDays(1)), convertToDate(LocalDateTime.now().plusDays(1).plusHours(2))));
            // Add more reservations as needed
        };
    }

    public Date convertToDate(LocalDateTime localDateTime) {
        var zonedDateTime = localDateTime.atZone(ZoneId.systemDefault());
        return Date.from(zonedDateTime.toInstant());
    }
}
