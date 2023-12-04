package si.arnes.reservationsbackend.dtos;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public class CreateReservationDTO {
    @NotNull(message = "Name must not be null")
    private String name;

    @NotNull(message = "Start time must not be null")
    @FutureOrPresent(message = "Start time must be in the future or present")
    private Date start;

    @NotNull(message = "End time must not be null")
    @FutureOrPresent(message = "End time must be in the future or present")
    private Date end;

    public CreateReservationDTO(String name, Date start, Date end) {
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

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    // Constructors, Getters, and Setters
}
