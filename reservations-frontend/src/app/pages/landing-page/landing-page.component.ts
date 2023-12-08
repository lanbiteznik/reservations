import { Component, OnDestroy, OnInit, ViewChild, inject } from "@angular/core";
import { CalendarOptions, EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { ReservationService } from "src/app/services/reservations.service";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { ReservationModalService } from "src/app/services/reservation-modal.service";
import { BehaviorSubject } from "rxjs";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslocoModule, TranslocoService } from "@ngneat/transloco";
import { CalendarModule } from "primeng/calendar";
import { ReservationFormComponent } from "./reservation-form/reservation-form.component";
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from "@angular/common/http";
import slLocale from '@fullcalendar/core/locales/sl';
import enLocale from '@fullcalendar/core/locales/en-gb';


@Component({
  standalone: true,
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"],
  imports: [CommonModule, ReactiveFormsModule, TranslocoModule, CalendarModule, ReservationFormComponent, FullCalendarModule, HttpClientModule]
})
export class LandingPageComponent implements OnInit, OnDestroy {
  calendarOptions?: CalendarOptions;
  startDate?: Date;
  endDate?: Date;
  selectedReservationId?: number;
  reservationTitle?: string;
  lang = 'en';

  @ViewChild("fullcalendar") fullcalendar?: FullCalendarComponent;

  private eventsSource = new BehaviorSubject<EventInput[]>([]);
  events$ = this.eventsSource.asObservable();

  private eventsSubscription = this.events$.subscribe((events) => {
    this.calendarOptions = {
      initialView: "timeGridWeek",
      slotLabelFormat: {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      },
      hiddenDays: [0, 6],
      slotMinTime: '07:00:00',
      slotMaxTime: '22:00:00',
      nowIndicator: true,
      timeZone: "local",
      locale: slLocale,
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
  });

  private reservationService = inject(ReservationService);
  public modalService = inject(ReservationModalService);
  public translocoService = inject(TranslocoService);
  

  ngOnInit() {
    this.loadReservations();
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
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

  switchLocale() {
    this.lang = this.lang === 'en' ? 'sl' : 'en';
    const newLocale = this.calendarOptions?.locale === slLocale ? enLocale : slLocale;
    this.calendarOptions!.locale = newLocale;
    this.fullcalendar?.getApi().setOption('locale', newLocale);
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

  switchLanguage(){
    this.switchLocale();
    const currentLang = this.translocoService.getActiveLang();
    const newLang = currentLang === 'en' ? 'sl' : 'en';
    this.translocoService.setActiveLang(newLang);
  }
}
