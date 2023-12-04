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
        List<Reservation> overlappingReservations = reservationRepository
                .findByStartLessThanAndEndGreaterThan
                        (createReservationDTO.getEnd(), createReservationDTO.getStart());
        if (!overlappingReservations.isEmpty()) {
            // Conflict found, throw an exception or handle accordingly
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Time slot is already booked");
        }

        Reservation reservation = new Reservation();
        reservation.setName(createReservationDTO.getName());
        reservation.setStart(createReservationDTO.getStart());
        reservation.setEnd(createReservationDTO.getEnd());

        Reservation savedReservation = reservationRepository.save(reservation);
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
        ReservationDTO dto = new ReservationDTO();
        dto.setId(reservation.getId());
        dto.setName(reservation.getName());
        dto.setStart(reservation.getStart());
        dto.setEnd(reservation.getEnd());
        return dto;
    }

    public ReservationDTO updateReservation(Long id, UpdateReservationDTO updateReservationDTO) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reservation not found"));

        // Update reservation details
        reservation.setName(updateReservationDTO.getName());
        reservation.setStart(updateReservationDTO.getStart());
        reservation.setEnd(updateReservationDTO.getEnd());

        Reservation updatedReservation = reservationRepository.save(reservation);
        return convertToDTO(updatedReservation);
    }
}
