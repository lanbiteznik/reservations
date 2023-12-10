import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService, MessageService]
})
export class AppComponent {
  title = "reservations";
}
