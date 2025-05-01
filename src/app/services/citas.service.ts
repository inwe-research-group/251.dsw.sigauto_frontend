import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { tap } from 'rxjs';
import { Cita } from '@models/cita';
import { RegisterCitaModel } from '@models/register-cita.model';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  http = inject(HttpClient);
  router = inject(Router);
  
  register(registerCitaData: RegisterCitaModel) {
    return this.http.post(`${environment.url}/api/citas`, registerCitaData).pipe(
      tap((res) => {
        console.log('Register Cita response', res);
      }),
      tap(() => {
        this.router.navigate(['/citas-history']);
      })
    );
  }

  getCitasByClienteId(clienteId: number) {
    return this.http.get<Cita[]>(`${environment.url}/api/citas/cliente/${clienteId}`).pipe(
      tap((res) => {
        console.log('Get Citas by ClienteId response', res);
      })
    );
  }
}
