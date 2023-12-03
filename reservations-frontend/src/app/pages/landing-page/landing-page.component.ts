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
import { ReservationModalService } from 'src/app/services/reservation-modal.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [DialogService]
})
export class LandingPageComponent implements OnInit {

  dialogRef?: DynamicDialogRef;
  calendarOptions?: CalendarOptions;

  startDate?: Date;
  endDate?: Date;

  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;

  constructor(public modalService: ReservationModalService, 
    private reservationService: ReservationService) {}

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
    this.startDate = arg.date;
    this.endDate = arg.date; // Adjust this as per your requirement
    this.modalService.openModal();
  }
  

  saveReservation(reservation: Reservation) {
    this.reservationService.createReservation(reservation).subscribe(savedReservation => {
      const calendarApi = this.fullcalendar?.getApi();
      calendarApi?.addEvent({
        title: savedReservation.name,
        start: savedReservation.start,
        end: savedReservation.end
      });
    });
  }

  loadReservations() {
    this.reservationService.getAllReservations().subscribe(reservations => {
      this.calendarOptions!.events = reservations.map(reservation => ({
        id: reservation.id?.toString(),
        title: reservation.name,
        start: reservation.start,
        end: reservation.end
      }));
    });
  }
}