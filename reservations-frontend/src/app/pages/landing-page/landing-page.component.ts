import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { ReservationService, Reservation } from 'src/app/services/reservations.service';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  dialogRef?: DynamicDialogRef;
  calendarOptions?: CalendarOptions;

  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;

  constructor(private dialogService: DialogService, private reservationService: ReservationService) {}

  ngOnInit() {
    this.calendarOptions = {
      initialView: 'timeGridWeek',
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      dateClick: this.handleDateClick.bind(this),
      events: [],
      headerToolbar: {
        start: 'title', // will normally be on the left
        center: '',
        end: 'today prev,next dayGridMonth,timeGridWeek,timeGridDay,listMonth' // Adjust as per your requirement
      }
    };

    // Load existing reservations
    this.loadReservations();
  }

  handleDateClick(arg: any) {
    this.dialogRef = this.dialogService.open(ReservationFormComponent, {
      header: 'Create Reservation',
      width: '70%',
      data: { start: arg.date, end: arg.date } // Pass the clicked date as start and end
    });

    this.dialogRef.onClose.subscribe((reservation: Reservation) => {
      if (reservation) {
        this.saveReservation(reservation);
      }
    });
  }

  saveReservation(reservation: Reservation) {
    this.reservationService.createReservation(reservation).subscribe(savedReservation => {
      const calendarApi = this.fullcalendar?.getApi();
      console.log(savedReservation)
      //calendarApi.addEvent(reservation);
    });
  }

  loadReservations() {
    this.reservationService.getAllReservations().subscribe(reservations => {
      const calendarEvents: EventInput[] = reservations.map(reservation => ({
        id: reservation.id?.toString(),  // Convert ID to string
        title: reservation.name,
        start: reservation.start,
        end: reservation.end
        // Add other necessary event properties here
      }));
  
      this.calendarOptions!.events = calendarEvents;
    });
  }
}