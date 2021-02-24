import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  frmRegistro:FormGroup;

  createFormGroup(){
    return new FormGroup({
      nombres: new FormControl('',[Validators.required])
    });
  }

  get nombres() { return this.frmRegistro.get('nombres'); }

  usuario:Usuario = {
    usu_dni: '72382233',
    usu_email: 'alex@gmail.com',
    usu_password: '123',
    usu_apellidos: 'Silvera',
    usu_nombres: 'Alexander',
    usu_telefono: '123456789',
    usu_celular: '044002325',
    usu_direccion: 'San aNDRES',
    usu_fech_reg: '2021-01-02',
  };

  constructor(private usuarioService:UsuarioService) {
    this.frmRegistro = this.createFormGroup();
   }

  ngOnInit(): void {
  }
  user_name:string;
  user_password:string;
  iniciarSesion(){
    this.AuthService.login(this.user_name,this.user_password).subscribe(resp=>{
      console.log(resp);
      if(resp[0]){

        if(resp[0].usu_dni){
          this.router.navigateByUrl('/shop/principal');
        }else{
          alert("xd");
        }
      }else{
        Swal.fire({
          title:'Error',
          text:'Credenciales no validas',
          icon:'warning'
        })
      }
      
      
    })
  }
  registrar(){
    console.log(this.usuario);
    localStorage.setItem("usuario",JSON.stringify(this.usuario));
    this.usuarioService.store(this.usuario).subscribe(data=>{
      console.log('exito')
    },error=>{
      console.log('Error')
    });

  }
usuario:Usuario = {
    usu_dni: '72382233',
    usu_email: 'alex@gmail.com',
    usu_password: '123',
    usu_apellidos: 'Silvera',
    usu_nombres: 'Alexander',
    usu_telefono: '123456789',
    usu_celular: '044002325',
    usu_direccion: 'San aNDRES',
    usu_fech_reg: '2021-01-02',
  };
}

