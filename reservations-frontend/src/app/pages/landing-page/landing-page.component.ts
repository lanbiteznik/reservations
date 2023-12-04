import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { CalendarOptions, EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { ReservationService } from "src/app/services/reservations.service";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { ReservationModalService } from "src/app/services/reservation-modal.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"],
})
export class LandingPageComponent implements OnInit {
  calendarOptions?: CalendarOptions;

  startDate?: Date;
  endDate?: Date;
  selectedReservationId?: number;
  reservationTitle?: string;

  @ViewChild("fullcalendar") fullcalendar?: FullCalendarComponent;

  private eventsSource = new BehaviorSubject<EventInput[]>([]);
  events$ = this.eventsSource.asObservable();

  constructor(
    public modalService: ReservationModalService,
    private reservationService: ReservationService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.events$.subscribe((events) => {
      this.calendarOptions = {
        initialView: "timeGridWeek",
        slotLabelFormat: {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // 24-hour format
        },
        timeZone: "local",
        locale: "sl",
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        dateClick: this.handleDateClick.bind(this),
        eventClick: this.handleEventClick.bind(this),
        events: events,
        headerToolbar: {
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        },
      };
      this.changeDetectorRef.detectChanges();
    });

    this.loadReservations();
  }

  handleDateClick(arg: any) {
    let end = new Date(arg.date);
    end.setHours(end.getHours() + 1);
    this.startDate = arg.date;
    this.endDate = end;
    this.selectedReservationId = undefined;
    this.reservationTitle = "";
    this.modalService.openModal();
  }

  onReservationSaved() {
    this.loadReservations();
  }

  loadReservations() {
    this.reservationService.getAllReservations().subscribe((reservations) => {
      const events = reservations.map((reservation) => ({
        id: reservation.id?.toString(),
        title: reservation.name,
        start: reservation.start,
        end: reservation.end,
      }));
      this.eventsSource.next(events);
    });
  }

  handleEventClick(clickInfo: any) {
    const clickedEvent = clickInfo.event;
    this.startDate = clickedEvent.start;
    this.endDate = clickedEvent.end;
    this.reservationTitle = clickedEvent.title;
    this.selectedReservationId = clickedEvent.id;

    this.modalService.openModal();
  }
}
