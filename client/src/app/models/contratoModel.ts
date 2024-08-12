export class Contrato {
    constructor (idDocumento = 0, nombre_documento = '', tipo_contrato = '', fecha_termino = '', documento = '', clienteIdCliente = '', createdAt = '') {

        this.idDocumento = idDocumento;
        this.nombre_documento = nombre_documento;
        this.tipo_contrato = tipo_contrato;
        this.fecha_termino = fecha_termino;
        this.documento = documento;
        this.createdAt = createdAt;
        this.clienteIdCliente = clienteIdCliente;

    }

    idDocumento: number;
    nombre_documento: string;
    tipo_contrato: string;
    fecha_termino: string;
    documento: string;
    createdAt: string;
    clienteIdCliente: string;

}