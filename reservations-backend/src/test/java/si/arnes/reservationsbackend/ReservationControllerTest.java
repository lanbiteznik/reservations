package si.arnes.reservationsbackend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import si.arnes.reservationsbackend.contollers.ReservationController;
import si.arnes.reservationsbackend.dtos.CreateReservationDTO;
import si.arnes.reservationsbackend.dtos.ReservationDTO;
import si.arnes.reservationsbackend.service.ReservationService;

import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ReservationControllerTest {

    @Mock
    private ReservationService reservationService;

    @InjectMocks
    private ReservationController reservationController;

    @BeforeEach
    void setUp() {
        // Setup mock data and interactions
    }

    @Test
    void testCreateReservation() {
        CreateReservationDTO createDTO = new CreateReservationDTO("Test Meeting", new Date(), new Date());
        ReservationDTO reservationDTO = new ReservationDTO(1L, "Test Meeting", new Date(), new Date());
        when(reservationService.saveReservation(createDTO)).thenReturn(reservationDTO);

        ResponseEntity<ReservationDTO> response = reservationController.createReservation(createDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(reservationDTO, response.getBody());
        verify(reservationService).saveReservation(createDTO);
    }

    @Test
    void testGetAllReservations() {
        List<ReservationDTO> mockReservations = List.of(
                new ReservationDTO(1L, "Meeting 1", new Date(), new Date()),
                new ReservationDTO(2L, "Meeting 2", new Date(), new Date())
        );
        when(reservationService.getAllReservations()).thenReturn(mockReservations);

        ResponseEntity<List<ReservationDTO>> response = reservationController.getAllReservations();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
        verify(reservationService).getAllReservations();
    }

    // Similar tests for getReservationById, deleteReservation, and updateReservation
}
