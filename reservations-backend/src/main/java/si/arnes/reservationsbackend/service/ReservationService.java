package si.arnes.reservationsbackend.service;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import si.arnes.reservationsbackend.dtos.CreateReservationDTO;
import si.arnes.reservationsbackend.dtos.ReservationDTO;
import si.arnes.reservationsbackend.dtos.UpdateReservationDTO;
import si.arnes.reservationsbackend.models.Reservation;
import si.arnes.reservationsbackend.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public ReservationDTO saveReservation(CreateReservationDTO createReservationDTO) {
        // Check for overlapping reservations
        var overlappingReservations = reservationRepository
                .findByStartLessThanAndEndGreaterThan
                        (createReservationDTO.end(), createReservationDTO.start());
        if (!overlappingReservations.isEmpty()) {
            // Conflict found, throw an exception or handle accordingly
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Time slot is already booked");
        }

        var reservation = new Reservation();
        reservation.setName(createReservationDTO.name());
        reservation.setStart(createReservationDTO.start());
        reservation.setEnd(createReservationDTO.end());

        var savedReservation = reservationRepository.save(reservation);
        return convertToDTO(savedReservation);
    }

    public List<ReservationDTO> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<ReservationDTO> getReservationById(Long id) {
        return reservationRepository.findById(id)
                .map(this::convertToDTO);
    }

    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }

    private ReservationDTO convertToDTO(Reservation reservation) {
        return new ReservationDTO(reservation.getId(),reservation.getName(),reservation.getStart(),reservation.getEnd());
    }

    public ReservationDTO updateReservation(Long id, UpdateReservationDTO updateReservationDTO) {
        var reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reservation not found"));

        // Update reservation details
        reservation.setName(updateReservationDTO.name());
        reservation.setStart(updateReservationDTO.start());
        reservation.setEnd(updateReservationDTO.end());

        var updatedReservation = reservationRepository.save(reservation);
        return convertToDTO(updatedReservation);
    }
}
