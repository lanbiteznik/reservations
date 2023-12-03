import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ReservationFormComponent } from './pages/landing-page/reservation-form/reservation-form.component';

const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent,
    children: [
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
