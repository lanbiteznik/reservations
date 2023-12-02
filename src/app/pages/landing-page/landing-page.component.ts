import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    dateClick: this.handleDateClick.bind(this),
    headerToolbar: {
      start: 'title', // will normally be on the left
      center: '',
      end: 'today prev,next dayGridMonth,timeGridWeek,timeGridDay,listMonth' // Adjust as per your requirement
    }
  };

  handleDateClick(arg:any) {
    let title = prompt("Enter event title");
    if (title) {
      let calendarApi = arg.view.calendar;
      calendarApi.addEvent({
        title: title,
        start: arg.date,
        allDay: arg.allDay
      });
    }
  }
}

