package si.arnes.reservationsbackend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import si.arnes.reservationsbackend.models.Reservation;
import si.arnes.reservationsbackend.repository.ReservationRepository;

import java.time.LocalDateTime;

public class DataLoader {

    @Bean
    public CommandLineRunner initData(ReservationRepository reservationRepository) {
        return args -> {
            // Create and save entities
            Reservation reservation1 = new Reservation("Meeting 1", LocalDateTime.now(), LocalDateTime.now().plusHours(1));
            reservationRepository.save(reservation1);

            Reservation reservation2 = new Reservation("Meeting 2", LocalDateTime.now().plusDays(1), LocalDateTime.now().plusDays(1).plusHours(1));
            reservationRepository.save(reservation2);

            // Add more reservations as needed
        };
    }
}
