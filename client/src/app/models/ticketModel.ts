export class Ticket { 
    constructor(idTicket = 0, asunto = '', descripcion_ticket = '', status = '', prioridad = '', sla = '', fecha_vencimiento = '',
     hora_inicio = '', hora_termino= '', usuarioIdUsuario = 0, user_ticket = '', clienteIdCliente = '', departamentoIdDepartamento = '', servicioIdServicio = '',) {

        this.idTicket = idTicket;
        this.asunto = asunto;
        this.descripcion_ticket = descripcion_ticket;
        this.prioridad = prioridad;
        this.status = status;
        this.sla = sla;
        this.user_ticket = user_ticket;
        this.fecha_vencimiento = fecha_vencimiento;
        this.hora_inicio = hora_inicio;
        this.hora_termino = hora_termino;
        this.usuarioIdUsuario = usuarioIdUsuario;
        this.clienteIdCliente = clienteIdCliente;
        this.departamentoIdDepartamento = departamentoIdDepartamento;
        this.servicioIdServicio = servicioIdServicio;

    }

    idTicket: number;
    asunto: string;
    descripcion_ticket: string;
    prioridad: string;
    status: string;
    sla: string;
    fecha_vencimiento: string;
    user_ticket: string;
    hora_inicio: string;
    hora_termino: string;
    usuarioIdUsuario: number;
    clienteIdCliente: string;
    departamentoIdDepartamento: string;
    servicioIdServicio: string;

}