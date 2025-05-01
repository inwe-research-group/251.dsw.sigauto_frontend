export interface Persona {
    id: number;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    fecha_nacimiento: Date;
    direccion: string;
    sexo: string;
    numero_documento: number;
    email?: string;
    telefono: number;
    created_at?: Date;
    updated_at?: Date;
}