package si.arnes.reservationsbackend.dtos;


import java.time.LocalDateTime;

public class UpdateReservationDTO {
    private Long id;
    private String name;
    private LocalDateTime start;
    private LocalDateTime end;

    public UpdateReservationDTO(Long id, String name, LocalDateTime start, LocalDateTime end) {
        this.id = id;
        this.name = name;
        this.start = start;
        this.end = end;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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