import { Routes } from '@angular/router';
import { RegisterComponent } from '@pages/register/register.component';
import { HomeComponent } from '@pages/home/home.component';
import { VehicleRegistrationComponent } from '@components/vehicle-registration/vehicle-registration.component';
import { InicioSesionComponent } from '@components/inicio-sesion/inicio-sesion.component';
import { AuthGuard } from '@guards/auth.guard';
import { AuthReverseGuard } from '@guards/auth-reverse.guard';
import { HistorialCitasPageComponent } from '@pages/historial-citas-page/historial-citas-page.component';
import { ProgramarCitaPageComponent } from '@pages/programar-cita-page/programar-cita-page.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent, canActivate: [AuthReverseGuard] },
    { path: 'register-vehicle', component: VehicleRegistrationComponent, canActivate: [AuthGuard] },
    { path: 'register-cita', component: ProgramarCitaPageComponent},
    { path: 'login', component: InicioSesionComponent, canActivate: [AuthReverseGuard] },
    { path: 'cita-history', component: HistorialCitasPageComponent},
    {path: '**', redirectTo: ''}
];
