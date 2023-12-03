import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent {
  reservationTitle?: string;
  reservationTime?: string;

  constructor() { }

  onSubmit() {
    // Tukaj dodajte logiko za obdelavo obrazca
    console.log('Rezervacija poslana', this.reservationTitle, this.reservationTime);
  }
}
