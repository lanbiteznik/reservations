package si.arnes.reservationsbackend.dtos;

import java.util.Date;

public record UpdateReservationDTO(Long id, String name, Date start, Date end) {
}
