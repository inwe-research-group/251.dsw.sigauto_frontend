import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbDropdownModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService);
  tokenService = inject(TokenService);

  get names(): string | null {
    return this.tokenService.getNames();
  }

  logout(){
    console.log('logout')
    this.authService.logout();
  }
}
