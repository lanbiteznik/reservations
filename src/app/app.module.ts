import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { NavBarComponent } from "./common/navbar/navbar.component";
import { FullCalendarModule } from '@fullcalendar/angular';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ReservationFormComponent } from './pages/landing-page/reservation-form/reservation-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, NavBarComponent, LandingPageComponent, ReservationFormComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FullCalendarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
