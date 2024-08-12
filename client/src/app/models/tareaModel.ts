export class Tarea {
    constructor(idTarea = 0, asunto_tarea = '', descripcion_tarea = '', status_tarea = '', generado_por = '', fecha_creacion = '', fecha_vencimiento = '',
    updateAt = '', ticketIdTicket = 0, usuarioIdUsuario = 0) {

        this.idTarea = idTarea;
        this.asunto_tarea = asunto_tarea;
        this.descripcion_tarea = descripcion_tarea;
        this.status_tarea = status_tarea;
        this.generado_por = generado_por;
        this.fecha_creacion = fecha_creacion;
        this.fecha_vencimiento = fecha_vencimiento;
        this.updateAt = updateAt;
        this.ticketIdTicket = ticketIdTicket;
        this.usuarioIdUsuario = usuarioIdUsuario;

    }

    idTarea: number;
    asunto_tarea: string;
    descripcion_tarea: string;
    status_tarea: string;
    generado_por: string;
    fecha_creacion: string;
    fecha_vencimiento: string;
    updateAt: string;
    ticketIdTicket: number;
    usuarioIdUsuario: number;

}