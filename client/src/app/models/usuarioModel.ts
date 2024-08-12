
export class Usuario {
    constructor(idUsuario = 0, idClienteUser = 0, nombre_usuario = '', usuario = '', rol = 0, email = '', password = '', departamentoIdDepartamento = 0) {
        this.idUsuario = idUsuario;
        this.nombre_usuario = nombre_usuario;
        this.usuario = usuario;
        this.rol = rol;
        this.email = email;
        this.password = password;
        this.departamentoIdDepartamento = departamentoIdDepartamento;
        this.idClienteUser = idClienteUser;
    }

    idUsuario: number;
    nombre_usuario: string;
    usuario: string;
    rol: number;
    email: string;
    password: string;
    departamentoIdDepartamento: number;
    idClienteUser: number;



}