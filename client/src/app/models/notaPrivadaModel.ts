export class NotaPrivada {
    constructor (idNotaPrivada = 0, nota_privada = '', ticketIdTicket = 0, usuarioIdUsuario = 0) {

        this.idNotaPrivada = idNotaPrivada;
        this.nota_privada = nota_privada;
        this.ticketIdTicket = ticketIdTicket;
        this.usuarioIdUsuario = usuarioIdUsuario;

    }

    idNotaPrivada: number;
    nota_privada: string;
    ticketIdTicket: number;
    usuarioIdUsuario: number;

}