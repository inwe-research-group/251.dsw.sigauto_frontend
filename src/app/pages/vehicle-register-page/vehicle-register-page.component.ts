import { Component } from '@angular/core';
import { VehicleRegistrationComponent } from "../../components/vehicle-registration/vehicle-registration.component";

@Component({
  selector: 'app-vehicle-register-page',
  standalone: true,
  imports: [VehicleRegisterPageComponent, VehicleRegistrationComponent],
  templateUrl: './vehicle-register-page.component.html',
  styleUrl: './vehicle-register-page.component.scss'
})
export class VehicleRegisterPageComponent {

  
}
