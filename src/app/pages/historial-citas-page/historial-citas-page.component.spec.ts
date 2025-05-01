import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HistorialCitasPageComponent } from './historial-citas-page.component';
import { CitasService } from '@services/citas.service';
import { TiposServicioService } from '@services/tipos-servicio.service';
import { TokenService } from '@services/token.service';
import { of } from 'rxjs';
import { AsyncPipe, JsonPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

describe('HistorialCitasPageComponent', () => {
  let component: HistorialCitasPageComponent;
  let fixture: ComponentFixture<HistorialCitasPageComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockCitasService: jasmine.SpyObj<CitasService>;
  let mockTiposServicioService: jasmine.SpyObj<TiposServicioService>;
  let mockTokenService: jasmine.SpyObj<TokenService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockCitasService = jasmine.createSpyObj('CitasService', ['getCitasByClienteId']);
    mockTiposServicioService = jasmine.createSpyObj('TiposServicioService', ['getServicioById']);
    mockTokenService = jasmine.createSpyObj('TokenService', ['getClienteId']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: CitasService, useValue: mockCitasService },
        { provide: TiposServicioService, useValue: mockTiposServicioService },
        { provide: TokenService, useValue: mockTokenService },
        AsyncPipe,
        JsonPipe,
        DatePipe
      ]
    }).compileComponents();

    mockTokenService.getClienteId.and.returnValue('123');
    mockCitasService.getCitasByClienteId.and.returnValue(of([]));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialCitasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('getServicioById', () => {
    it('should call TiposServicioService.getServicioById', () => {
      const mockServicio = { id: 1, name: 'Mantenimiento' };
      mockTiposServicioService.getServicioById.and.returnValue(mockServicio);

      const result = component.getServicioById(1);

      expect(mockTiposServicioService.getServicioById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockServicio);
    });
  });

  describe('onBack', () => {
    it('should navigate to home page', () => {
      component.onBack();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
    });
  });
})