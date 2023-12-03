package si.arnes.reservationsbackend.repository;

import si.arnes.reservationsbackend.models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByStartLessThanEqualAndEndGreaterThanEqual(LocalDateTime end, LocalDateTime start);
}
