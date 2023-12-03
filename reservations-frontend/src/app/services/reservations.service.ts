import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/reservations';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/new-reservation`, reservation, this.httpOptions);
  }

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/get-all`);
  }

  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/get-reservation/${id}`);
  }

  updateReservation(id: number, reservation: Reservation): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-reservation/${id}`, reservation, this.httpOptions);
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-reservation/${id}`, this.httpOptions);
  }
}

export interface Reservation {
  id?: number;
  name: string;
  start: Date;
  end: Date;
}