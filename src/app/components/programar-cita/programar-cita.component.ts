import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TiposServicioService } from '@services/tipos-servicio.service';
import { VehicleService } from '@services/vehicle.service';
import { CitasService } from '@services/citas.service';
import { TokenService } from '@services/token.service';
import { ToastService } from '@services/toast.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-programar-cita',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './programar-cita.component.html',
  styleUrls: ['./programar-cita.component.scss']
})
export class ProgramarCitaComponent {
  form = new FormGroup({
    vehiculo: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    servicio: new FormControl('', Validators.required),
  })

  vehicleService = inject(VehicleService);
  tiposServicioService = inject(TiposServicioService);
  citasService = inject(CitasService);
  tokenService = inject(TokenService);
  toastService = inject(ToastService)

  vehicles$ = this.vehicleService.getVehicles();
  servicios = this.tiposServicioService.getServicios();

  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      const { vehiculo, fecha, servicio } = this.form.value;
      const idCliente = this.tokenService.getClienteId();

      const cita = {
        idCliente: +idCliente,
        idVehiculo: Number(vehiculo || '1'),
        idTipoServicio: Number(servicio || '1'),
        fecha: fecha?.toString() || '',
        estado: true
      };

      this.citasService.register(cita).pipe(
        catchError((err) => {
          this.toastService.show('Error al registrar la cita', 'danger');
          return throwError(err);
        })
      ).subscribe((res) => {
        console.log('Cita registrada', res);
        this.toastService.show('Cita registrada correctamente', 'success');
      })

    } else {
      this.toastService.show('Por favor, complete los campos requeridos', 'danger');
    }
  }

  onBack() {
    alert('Regresando...');
  }

  ngOnInit(){
    this.vehicleService.getVehicles().subscribe((vehicles) => {
      console.log('Vehicles', vehicles);
    })
  }
}

