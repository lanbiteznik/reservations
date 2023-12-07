import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService]
})
export class AppComponent {
  title = "reservations";
}
