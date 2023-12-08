package si.arnes.reservationsbackend.dtos;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record CreateReservationDTO(
        @NotNull(message = "Name must not be null") String name,
        @NotNull(message = "Start time must not be null")
        @FutureOrPresent(message = "Start time must be in the future or present") Date start,
        @NotNull(message = "End time must not be null")
        @FutureOrPresent(message = "End time must be in the future or present") Date end) {
}
