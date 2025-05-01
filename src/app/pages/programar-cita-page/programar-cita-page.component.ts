import { Component } from '@angular/core';
import { ProgramarCitaComponent } from '@components/programar-cita/programar-cita.component';

@Component({
  selector: 'app-programar-cita-page',
  standalone: true,
  imports: [ProgramarCitaComponent],
  templateUrl: './programar-cita-page.component.html',
  styleUrl: './programar-cita-page.component.scss'
})
export class ProgramarCitaPageComponent {

}
