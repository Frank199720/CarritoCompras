import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../interfaces/user';
import { HistorialService } from '../../../../services/historial.service';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  cabezera = [];
  nombres:String;
  constructor(historial:HistorialService, private authService:AuthService) { 
    historial.getHistorial(authService.user.usu_dni).subscribe((data:any[])=>{
      this.cabezera = data;
    });
    this.nombres = authService.user.usu_apellidos + ' ' + authService.user.usu_nombres;
  }

  ngOnInit(): void { }

}
