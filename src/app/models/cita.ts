import { Cliente } from './cliente';
import { Vehiculo } from './vehiculo';

export interface Cita {
  idCita: number;
  cliente: Cliente;
  vehiculo: Vehiculo;
  idTipoServicio: number;
  fecha: Date;
  estado: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}