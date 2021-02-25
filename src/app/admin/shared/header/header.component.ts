import { Component, OnInit } from '@angular/core';
import { Prueba } from 'src/app/interfaces/prueba';
import { CarService } from 'src/app/services/car.service';
import { AuthService } from '../../../services/auth.service';
import { tap } from 'rxjs/operators'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  nameUser:string;
  constructor(public carrito:CarService, public AuthService:AuthService) { 
    console.log("aaaaaaaah");
    if(localStorage.getItem('token')){
      console.log(this.AuthService.cargarData().subscribe((data)=>{
        this.nameUser=data[0].usu_nombres;
        console.log(data[0]);
    }));
    }else{
      this.AuthService.loginService=false;
    }
    

    
    
      
   
      
  }
  datos=[];
  login:Boolean=false;
  ngOnInit(): void {
    
    
    let items = localStorage.getItem("arreglo")
    if(items){
      this.datos = JSON.parse(items);
      this.carrito.numeroVentas=0;
      this.datos.forEach(element => {
        this.carrito.numeroVentas =  this.carrito.numeroVentas + element.pro_cantidad_elegida;
      });
      
    }else{
      this.carrito.numeroVentas=0;
    }
    
  }
  verificarAuht(){
    return this.AuthService.cargarData();
  }
  cerrarSesion(){
    console.log("hola");
    localStorage.removeItem('token');
    localStorage.removeItem('arreglo');
    this.carrito.numeroVentas=0;
    this.carrito.totalVenta=0;
    location.reload();
  }
}
