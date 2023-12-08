package si.arnes.reservationsbackend.contollers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import si.arnes.reservationsbackend.dtos.CreateReservationDTO;
import si.arnes.reservationsbackend.dtos.ReservationDTO;
import si.arnes.reservationsbackend.dtos.UpdateReservationDTO;
import si.arnes.reservationsbackend.service.ReservationService;

import java.util.List;

@Validated
@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping("/reservation")
    public ResponseEntity<ReservationDTO> createReservation(@Valid @RequestBody CreateReservationDTO createReservationDTO) {
        ReservationDTO reservationDTO = reservationService.saveReservation(createReservationDTO);
        return ResponseEntity.ok(reservationDTO);
    }

    @GetMapping()
    public ResponseEntity<List<ReservationDTO>> getAllReservations() {
        List<ReservationDTO> reservationDTOs = reservationService.getAllReservations();
        return ResponseEntity.ok(reservationDTOs);
    }

    @GetMapping("/reservation/{id}")
    public ResponseEntity<ReservationDTO> getReservationById(@PathVariable Long id) {
        return reservationService.getReservationById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/reservation/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/reservation/{id}")
    public ResponseEntity<ReservationDTO> updateReservation(@PathVariable Long id,
                                                            @Valid @RequestBody UpdateReservationDTO updateReservationDTO) {
        ReservationDTO updatedReservationDTO = reservationService.updateReservation(id, updateReservationDTO);
        return ResponseEntity.ok(updatedReservationDTO);
    }
}
