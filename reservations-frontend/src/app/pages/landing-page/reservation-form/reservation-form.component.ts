import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  Output,
  inject,
} from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FullCalendarModule } from "@fullcalendar/angular";
import { TranslocoModule } from "@ngneat/transloco";
import { CalendarModule } from "primeng/calendar";
import { Subscription } from "rxjs";
import { ReservationModalService } from "src/app/services/reservation-modal.service";
import { ToastModule } from 'primeng/toast';
import {
  ReservationService,
  Reservation,
} from "src/app/services/reservations.service";
import { MessageService } from "primeng/api";

@Component({
  standalone: true,
  selector: "app-reservation-form",
  templateUrl: "./reservation-form.component.html",
  styleUrls: ["./reservation-form.component.scss"],
  imports: [CommonModule, ReactiveFormsModule, TranslocoModule, CalendarModule, FullCalendarModule, ToastModule],
  providers: [MessageService]
})
export class ReservationFormComponent implements OnInit, OnDestroy {
  reservationForm?: FormGroup;
  displayModal: boolean = false;
  @Input() reservationStart?: Date;
  @Input() reservationEnd?: Date;
  @Input() selectedReservationId?: number;
  @Input() reservationTitle?: string;
  private subscription: Subscription = new Subscription();
  @Output() reservationSaved = new EventEmitter<string>();
  

  public modalService = inject(ReservationModalService);
  private reservationService = inject(ReservationService);
  private messageService = inject(MessageService);

  ngOnInit() {
    this.reservationForm = new FormGroup({
      title: new FormControl<String | undefined>(this.reservationTitle, Validators.required),
      start: new FormControl<Date | undefined>(this.reservationStart, Validators.required),
      end: new FormControl<Date | undefined>(this.reservationEnd, Validators.required)
    });

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
      this.reservationForm?.valid
    ) {
      const reservationData: Reservation = {
        id: this.selectedReservationId,
        name: this.reservationForm?.value.title,
        start: this.reservationForm?.value.start,
        end: this.reservationForm?.value.end,
      };

      if (this.selectedReservationId) {
        this.reservationService
          .updateReservation(this.selectedReservationId, reservationData)
          .subscribe({
            next: () => {
              this.reservationSaved.emit('updated');
              this.modalService.closeModal();
            },
            error: (error) =>
            {
              const errorMessages = Object.values(error.error).join('\n');
              console.error("Error updating reservation", error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: errorMessages
              });
            },
          });
      } else {
        // Create new reservation
        this.reservationService.createReservation(reservationData).subscribe({
          next: () => {
            this.reservationSaved.emit('success');
            this.modalService.closeModal();
            
          },
          error: (error) => 
          {
            const errorMessages = Object.values(error.error).join('\n');
            console.error("Error saving reservation", error),
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: errorMessages
            });
        }});
      }
    } else {
      console.error("Error saving reservation");
      /*this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: "Error saving reservation"
      });*/
      this.reservationForm?.markAllAsTouched();
      return;
    }
  }

  deleteReservation() {
    if (this.selectedReservationId) {
      this.reservationService
        .deleteReservation(this.selectedReservationId)
        .subscribe({
          next: () => {
            this.reservationSaved.emit("deleted"); // This will trigger the refresh of events
            this.modalService.closeModal();
          },
          error: (error) => console.error("Error deleting reservation", error),
        });
    }
  }
}
