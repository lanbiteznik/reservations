import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { NavBarComponent } from "./common/navbar/navbar.component";
import { FullCalendarModule } from '@fullcalendar/angular';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ReservationFormComponent } from './pages/landing-page/reservation-form/reservation-form.component';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { TranslocoRootModule } from './transloco-root.module';

@NgModule({
  declarations: [AppComponent, NavBarComponent, LandingPageComponent, ReservationFormComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FullCalendarModule,
    FormsModule,
    CalendarModule,
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    TranslocoRootModule,
  ],
  providers: [DialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
