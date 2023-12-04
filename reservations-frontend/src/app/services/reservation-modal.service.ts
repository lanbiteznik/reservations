import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationModalService {
  private displayModalSource = new BehaviorSubject<boolean>(false);

  openModal() {
    this.displayModalSource.next(true);
  }

  closeModal() {
    this.displayModalSource.next(false);
  }

  get displayModal$() {
    return this.displayModalSource.asObservable();
  }

}
