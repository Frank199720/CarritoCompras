import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private AuthService:AuthService , private router:Router) { }

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
}

