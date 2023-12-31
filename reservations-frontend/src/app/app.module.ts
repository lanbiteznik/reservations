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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoRootModule } from './transloco-root.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [ AppComponent, NavBarComponent],
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
    ReactiveFormsModule,
    LandingPageComponent,
    ToastModule
  ],
  providers: [DialogService,MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
