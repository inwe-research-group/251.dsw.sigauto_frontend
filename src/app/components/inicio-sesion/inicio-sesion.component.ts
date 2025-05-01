import { HttpClientModule } from '@angular/common/http';
import { Component, inject,TemplateRef,ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Location } from '@angular/common';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.scss'
})
export class InicioSesionComponent {
  authService = inject(AuthService);
  location = inject(Location);
  toastService = inject(ToastService)
  @ViewChild('successTpl', { static: true }) successTpl!: TemplateRef<any>;


  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  login() {
    console.log(this.form.value);
    if (this.form.invalid) {
      console.log('form invalid')
      return;
    }

    if (!this.form.value.email || !this.form.value.password) {
      console.log('email or password missing')
      return;
    }

    this.authService.login(this.form.value.email, this.form.value.password).subscribe(
      response => {
        this.toastService.show('Ingreso exitoso', 'success');
        console.log('Login successful', response);
      },
      error => {
        this.toastService.show(`Ingreso fallido. ${error?.error}`, 'danger');
        console.error('Login failed', error.error);
      }
    );
  }

  onBack() {
    this.location.back();
  }
}