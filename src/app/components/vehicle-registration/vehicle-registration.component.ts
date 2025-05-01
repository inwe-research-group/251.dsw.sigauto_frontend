import { Component, inject } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterVehicleModel } from '@models/register-vehicle.model';
import { TokenService } from '@services/token.service';
import { RegisterVehicleService } from '@services/register-vehicle.service';

@Component({
  selector: 'app-vehicle-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './vehicle-registration.component.html',
  styleUrls: ['./vehicle-registration.component.scss'],
})
export class VehicleRegistrationComponent {
  tokenService = inject(TokenService);
  registerVehiclService = inject(RegisterVehicleService);

  vehicleForm = new FormGroup({
    placa: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    year: new FormControl(0, Validators.required),
    // comentarios: new FormControl('')
  });

  onSubmit() {
    const idCliente = this.tokenService.getClienteId();

    console.log('Formulario de registro de vehículo', this.vehicleForm.value);
    console.log('id cliente', idCliente);

    const requestBody: RegisterVehicleModel ={
      marca: this.vehicleForm.value.marca || '',
      modelo: this.vehicleForm.value.modelo || '',
      year: +this.vehicleForm.value.year!,
      placa: this.vehicleForm.value.placa || '',
      idCliente: +idCliente
    }
    
    this.registerVehiclService.register(requestBody).subscribe((res) => {
      console.log('Registro de vehículo exitoso', res);
    })
  }

  onBack() {
    alert('Volviendo...');
  }
}

