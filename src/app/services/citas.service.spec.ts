import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CitasService } from './citas.service';
import { environment } from '@environments/environment';
import { RegisterCitaModel } from '@models/register-cita.model';
import { Cita } from '@models/cita';
import { Router } from '@angular/router';
import { Cliente } from '@models/cliente';
import { Vehiculo } from '@models/vehiculo';

describe('CitasService', () => {
  let service: CitasService;
  let httpMock: HttpTestingController;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CitasService,
        { provide: Router, useValue: routerSpy }
      ]
    });
    service = TestBed.inject(CitasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a cita and navigate to citas-history', () => {
    const mockRegisterCitaData: RegisterCitaModel = {
      idCliente: 1,
      idVehiculo: 1,
      idTipoServicio: 1,
      fecha: '2024-11-21',
      estado: true
    };

    service.register(mockRegisterCitaData).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.url}/api/citas`);
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/citas-history']);
  });

  it('should get citas by cliente id', () => {
    const mockCliente: Cliente = {
      idCliente: 1,
      nombres: 'John',
      apellidoPaterno: 'Doe',
      apellidoMaterno: 'Smith',
      email: 'john.doe@example.com',
      telefono: 123456789,
      direccion: '123 Main St',
      fechaNacimiento: new Date('1990-01-01'),
      sexo: 'M'
    };

    const mockVehiculo: Vehiculo = {
      idVehiculo: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      year: 2020,
      placa: 'ABC123',
      idCliente: 1
    };

    const mockCitas: Cita[] = [
      { idCita: 1, cliente: mockCliente, vehiculo: mockVehiculo, idTipoServicio: 1, fecha: new Date('2024-11-21'), estado: true },
      { idCita: 2, cliente: mockCliente, vehiculo: mockVehiculo, idTipoServicio: 2, fecha: new Date('2024-12-01'), estado: false }
    ];

    service.getCitasByClienteId(1).subscribe((res) => {
      expect(res).toEqual(mockCitas);
    });

    const req = httpMock.expectOne(`${environment.url}/api/citas/cliente/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCitas);
  });
});