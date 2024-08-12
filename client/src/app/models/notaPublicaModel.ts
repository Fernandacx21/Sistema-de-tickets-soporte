export class NotaPublica {
    constructor(idNotaPublica = 0, nota_publica = '', ticketIdTicket = 0, usuarioIdUsuario = 0) {

        this.idNotaPublica = idNotaPublica;
        this.nota_publica = nota_publica;
        this.ticketIdTicket = ticketIdTicket;
        this.usuarioIdUsuario = usuarioIdUsuario;

    }

    idNotaPublica: number;
    nota_publica: string;
    ticketIdTicket: number;
    usuarioIdUsuario: number;

}