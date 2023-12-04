import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  Output,
} from "@angular/core";
import { Subscription } from "rxjs";
import { ReservationModalService } from "src/app/services/reservation-modal.service";
import {
  ReservationService,
  Reservation,
} from "src/app/services/reservations.service";

@Component({
  selector: "app-reservation-form",
  templateUrl: "./reservation-form.component.html",
  styleUrls: ["./reservation-form.component.scss"],
})
export class ReservationFormComponent implements OnInit, OnDestroy {
  @Input() reservationStart?: Date;
  @Input() reservationEnd?: Date;
  @Input() selectedReservationId?: number;
  @Input() reservationTitle?: string;
  displayModal: boolean = false;
  private subscription: Subscription = new Subscription();
  @Output() reservationSaved = new EventEmitter<void>();

  constructor(
    public modalService: ReservationModalService,
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.modalService.displayModal$.subscribe((value) => {
        this.displayModal = value;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  close() {
    this.modalService.closeModal();
  }

  save() {
    if (
      !!this.reservationTitle &&
      !!this.reservationStart &&
      !!this.reservationEnd
    ) {
      const reservationData: Reservation = {
        id: this.selectedReservationId,
        name: this.reservationTitle,
        start: new Date(this.reservationStart),
        end: new Date(this.reservationEnd),
      };

      if (this.selectedReservationId) {
        // Update existing reservation
        this.reservationService
          .updateReservation(this.selectedReservationId, reservationData)
          .subscribe({
            next: () => {
              this.reservationSaved.emit();
              this.modalService.closeModal();
            },
            error: (error) =>
              console.error("Error updating reservation", error),
          });
      } else {
        // Create new reservation
        this.reservationService.createReservation(reservationData).subscribe({
          next: () => {
            this.reservationSaved.emit();
            this.modalService.closeModal();
          },
          error: (error) => console.error("Error saving reservation", error),
        });
      }
    } else {
      console.error("Error saving reservation");
    }
  }

  deleteReservation() {
    if (this.selectedReservationId) {
      this.reservationService
        .deleteReservation(this.selectedReservationId)
        .subscribe({
          next: () => {
            this.reservationSaved.emit(); // This will trigger the refresh of events
            this.modalService.closeModal();
          },
          error: (error) => console.error("Error deleting reservation", error),
        });
    }
  }

  validateForm(): boolean {
    return (
      !!this.reservationTitle &&
      !!this.reservationStart &&
      !!this.reservationEnd
    );
  }
}
