import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterModel } from '@models/register-model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  authService = inject(AuthService)

  form = new FormGroup({
    tipo_documento: new FormControl('', Validators.required), 
    numero_documento: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    nombres: new FormControl('', [Validators.required, Validators.minLength(2)]),
    apellido_paterno: new FormControl('', [Validators.required, Validators.minLength(2)]),
    apellido_materno: new FormControl('', [Validators.required, Validators.minLength(2)]),
    fecha_nacimiento: new FormControl('', Validators.required),
    telefono: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    sexo: new FormControl('', Validators.required),
    direccion: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  onSubmit() {
    // if (this.form.invalid) {
    //   console.log('form invalid')
    //   return;
    // }

    const registerData: RegisterModel = {
      email: this.form.value.email || '',
      password: this.form.value.password || '',
      nombres: this.form.value.nombres || '',
      apellidoPaterno: this.form.value.apellido_paterno || '',
      apellidoMaterno: this.form.value.apellido_materno || '',
      direccion: this.form.value.direccion || '',
      fechaNacimiento: this.form.value.fecha_nacimiento || '',
      sexo: 'M',
      numeroDocumento: parseInt(this.form.value.numero_documento as string, 10) || 0,
      telefono: parseInt(this.form.value.telefono as string, 10) || 0
    }

    this.authService.register(registerData).subscribe();
  }
}
