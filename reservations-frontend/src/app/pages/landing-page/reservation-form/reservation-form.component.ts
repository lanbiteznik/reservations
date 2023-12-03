import { Component, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReservationModalService } from 'src/app/services/reservation-modal.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html'
  // styleUrls if necessary
})
export class ReservationFormComponent implements OnInit, OnDestroy {
  @Input() reservationStart?: Date;
  @Input() reservationEnd?: Date;
  reservationTitle?: string;
  displayModal: boolean = true;
  private subscription: Subscription = new Subscription();

  constructor(public modalService: ReservationModalService) {}

  ngOnInit() {
    this.subscription.add(this.modalService.displayModal$.subscribe(value => {
      this.displayModal = value;
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  close() {
    this.modalService.closeModal();
  }

  save() {
    this.modalService.closeModal();
  }

  validateForm(): boolean {
    return !!this.reservationTitle && !!this.reservationStart && !!this.reservationEnd;
  }
  
}
