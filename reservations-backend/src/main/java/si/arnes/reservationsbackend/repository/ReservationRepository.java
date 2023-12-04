package si.arnes.reservationsbackend.repository;

import si.arnes.reservationsbackend.models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByStartLessThanEqualAndEndGreaterThanEqual(Date end, Date start);

    List<Reservation> findByStartLessThanAndEndGreaterThan(Date end, Date start);
}
