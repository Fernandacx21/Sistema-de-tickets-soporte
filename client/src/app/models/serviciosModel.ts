export class Servicios {
    constructor(idServicio = 0, nombre_servicio = '', descripcion_servicio = '', costo_servicio = 0, createdAt = '', updatedAt = '') {

        this.idServicio = idServicio;
        this.nombre_servicio = nombre_servicio;
        this.descripcion_servicio = descripcion_servicio;
        this.costo_servicio = costo_servicio;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;

    }

    idServicio: number;
    nombre_servicio: string;
    descripcion_servicio: string;
    costo_servicio: number;
    createdAt: string;
    updatedAt: string;

}