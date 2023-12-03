package si.arnes.reservationsbackend.dtos;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class CreateReservationDTO {
    @NotNull(message = "Name must not be null")
    private String name;

    @NotNull(message = "Start time must not be null")
    @FutureOrPresent(message = "Start time must be in the future or present")
    private LocalDateTime start;

    @NotNull(message = "End time must not be null")
    @FutureOrPresent(message = "End time must be in the future or present")
    private LocalDateTime end;

    public CreateReservationDTO(String name, LocalDateTime start, LocalDateTime end) {
        this.name = name;
        this.start = start;
        this.end = end;
    }

    public CreateReservationDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getStart() {
        return start;
    }

    public void setStart(LocalDateTime start) {
        this.start = start;
    }

    public LocalDateTime getEnd() {
        return end;
    }

    public void setEnd(LocalDateTime end) {
        this.end = end;
    }

    // Constructors, Getters, and Setters
}
