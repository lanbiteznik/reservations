import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html'
  // styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent {
  reservationTitle?: string;
  reservationStart?: Date;
  reservationEnd?: Date;
  displayModal: boolean = false;

  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  save() {
    this.onSave.emit({
      title: this.reservationTitle,
      start: this.reservationStart,
      end: this.reservationEnd
    });
    this.displayModal = false;
  }

  cancel() {
    this.onCancel.emit();
    this.displayModal = false;
  }
}
