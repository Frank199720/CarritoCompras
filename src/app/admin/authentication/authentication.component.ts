import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { Department } from 'src/app/interfaces/department';
import { Provincia } from 'src/app/interfaces/provincia';
import { Distrito } from 'src/app/interfaces/distrito';
import { UbicacionService } from 'src/app/services/ubicacion.service';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  frmRegistro:FormGroup;
  departamentos:Department[];
  provincias:Provincia[];
  distritos:Distrito[];
  createFormGroup(){
    return new FormGroup({
      nombres: new FormControl('',[Validators.required]),
      apellidos: new FormControl('',[Validators.required]),
      correo: new FormControl('',[Validators.required]),
      telefono: new FormControl('',[Validators.required]),
      celular: new FormControl('',[Validators.required]),
      dni: new FormControl('',[Validators.required]),
      departamento: new FormControl('',[Validators.required]),
      provincia: new FormControl('',[Validators.required]),
      distrito: new FormControl('',[Validators.required]),
      direccion: new FormControl('',[Validators.required]),
      contrasenia: new FormControl('',[Validators.required])
    });
  }

  get nombres() { return this.frmRegistro.get('nombres'); }
  get apellidos() { return this.frmRegistro.get('apellidos'); }
  get correo() { return this.frmRegistro.get('correo'); }
  get telefono() { return this.frmRegistro.get('telefono'); }
  get celular() { return this.frmRegistro.get('celular'); }
  get dni() { return this.frmRegistro.get('dni'); }
  get departamento() { return this.frmRegistro.get('departamento'); }
  get provincia() { return this.frmRegistro.get('provincia'); }
  get distrito() { return this.frmRegistro.get('distrito'); }
  get direccion() { return this.frmRegistro.get('direccion'); }
  get contrasenia() { return this.frmRegistro.get('contrasenia'); }
  public date = Date();
  
   usuario:User;
  constructor(private usuarioService:UsuarioService, private AuthService:AuthService ,private router:Router,private ubicacion:UbicacionService) {
    this.frmRegistro = this.createFormGroup();
    ubicacion.getDepartamentos().subscribe((data:Department[])=>{
      this.departamentos = data;
    });
    // ubicacion.getProvincias(this.usuario.department_id).subscribe((data:Provincia[])=>{
    //   this.provincias = data;
    // });
    // ubicacion.getDistritos(this.usuario.province_id).subscribe((data:Distrito[])=>{
    //   this.distritos = data;
    // });
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
    this.usuario = {
      usu_dni: this.dni.value,
      usu_email: this.correo.value,
      usu_password: this.contrasenia.value,
      usu_apellidos: this.apellidos.value,
      usu_nombres: this.nombres.value,
      usu_telefono: this.telefono.value,
      usu_celular: this.celular.value,
      usu_direccion: this.direccion.value,
      department_id: this.departamento.value,
      usu_fech_reg:null,
      district_id:this.distrito.value,
      province_id:this.provincia.value
    };
    if(!this.frmRegistro.invalid){
      this.usuarioService.store(this.usuario).subscribe(data=>{
        if(data==0){
          this.showMessage('Error!','Ya Existe el correo registrado','error');
        }else{
          this.showMessage('Exito!','Usuario registrado','success');
          this.user_name=this.correo.value;
          this.user_password=this.contrasenia.value;
          this.iniciarSesion();
        }
      },error=>{
        
      });
    }else{

    }
    

  }
  selectDep(departamento){
    this.ubicacion.getProvincias(departamento.value).subscribe((data:Provincia[])=>{
      this.provincias = data;
    });
  }
  selectProv(provincia){
    this.ubicacion.getDistritos(provincia.value).subscribe((data:Distrito[])=>{
      this.distritos = data;
    });
  }
  showMessage(title, text, icon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
}

