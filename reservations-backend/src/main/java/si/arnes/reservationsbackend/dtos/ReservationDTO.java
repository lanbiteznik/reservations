package si.arnes.reservationsbackend.dtos;

import java.util.Date;

public class ReservationDTO {
    private Long id;
    private String name;
    private Date start;
    private Date end;

    public ReservationDTO(Long id, String name, Date start, Date end) {
        this.id = id;
        this.name = name;
        this.start = start;
        this.end = end;
    }

    public ReservationDTO() {
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
