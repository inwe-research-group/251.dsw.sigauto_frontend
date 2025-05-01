import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Vehiculo } from '@models/vehiculo';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  http = inject(HttpClient);
  tokenService = inject(TokenService);

  clientId = this.tokenService.getClienteId();

  getVehicles(){
    return this.http.get<Vehiculo[]>(`${environment.url}/api/vehiculos/cliente/${this.clientId}`);
  }

}
