import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { RegisterVehicleModel } from '@models/register-vehicle.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterVehicleService {
  http = inject(HttpClient);
  router = inject(Router);;

  register(registerVehicleData: RegisterVehicleModel){
    return this.http.post(`${environment.url}/api/vehiculos`, registerVehicleData).pipe(
      tap((res) => {
        console.log('Register response', res);
      }),
      tap((res) => {
        this.router.navigate(['citas-history']);
      })
    )
  }

  constructor() { }
}
