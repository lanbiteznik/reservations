package si.arnes.reservationsbackend;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import si.arnes.reservationsbackend.dtos.ReservationDTO;
import si.arnes.reservationsbackend.models.Reservation;
import si.arnes.reservationsbackend.repository.ReservationRepository;
import si.arnes.reservationsbackend.service.ReservationService;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class ReservationServiceTest {

    @Mock
    private ReservationRepository reservationRepository;

    @InjectMocks
    private ReservationService reservationService;

    private AutoCloseable closeable;

    @BeforeEach
    public void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
        // additional setup if needed
    }

    @AfterEach
    public void tearDown() throws Exception {
        closeable.close();
        // additional teardown if needed
    }

    @Test
    public void testGetAllReservations() {
        // Arrange
        List<Reservation> mockReservations = new ArrayList<>();
        mockReservations.add(new Reservation("Test Reservation 1", new Date(), new Date()));
        mockReservations.add(new Reservation("Test Reservation 2", new Date(), new Date()));
        when(reservationRepository.findAll()).thenReturn(mockReservations);

        // Act
        List<ReservationDTO> result = reservationService.getAllReservations();

        // Assert
        assertEquals(2, result.size());
        verify(reservationRepository, times(1)).findAll();
    }

    // other test methods
}
