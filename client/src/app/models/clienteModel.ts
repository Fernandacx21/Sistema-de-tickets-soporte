export class Cliente {
    constructor( idCliente = 0, nombre_cliente = '', direccion_cliente = '', email_cliente = '', tipo_cliente = '', telefono_cliente = '', rfc = '', horas_soporte = 0) {

        this.idCliente = idCliente;
        this.nombre_cliente = nombre_cliente;
        this.direccion_cliente = direccion_cliente;
        this.email_cliente = email_cliente;
        this.tipo_cliente = tipo_cliente;
        this.telefono_cliente = telefono_cliente;
        this.rfc = rfc;
        this.horas_soporte = horas_soporte;

    }

    idCliente: number;
    nombre_cliente: string;
    direccion_cliente: string;
    email_cliente: string;
    tipo_cliente: string;
    telefono_cliente: string;
    rfc: string;
    horas_soporte: number;

}