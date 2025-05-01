export interface Cliente {
    idCliente: number;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email?: string;
    telefono: number;
    direccion: string;
    fechaNacimiento: Date;
    sexo: string;
    createdAt?: Date;
    updatedAt?: Date;
  }