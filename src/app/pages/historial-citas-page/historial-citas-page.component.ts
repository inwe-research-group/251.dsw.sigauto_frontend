import { AsyncPipe, JsonPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CitasService } from '@services/citas.service';
import { TiposServicioService } from '@services/tipos-servicio.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-historial-citas-page',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, DatePipe],
  templateUrl: './historial-citas-page.component.html',
  styleUrl: './historial-citas-page.component.scss'
})
export class HistorialCitasPageComponent {
  router = inject(Router);


  citasService = inject(CitasService);
  tiposServicioService = inject(TiposServicioService);
  tokenService = inject(TokenService);

  clientId = this.tokenService.getClienteId

  citas$ = this.citasService.getCitasByClienteId(+this.clientId);
  getServicioById(id: number){
    return this.tiposServicioService.getServicioById(id);
  }

  onBack(){
    this.router.navigate(['/home']);
  }
}
