export interface User {
    usu_dni:string;
    usu_email:string;
    usu_password?:string;
    usu_apellidos:string;
    usu_nombres:string;
    usu_telefono:string;
    usu_celular:string;
    usu_direccion:string;
    department_id:number;
    province_id:number;
    district_id:number;
}
