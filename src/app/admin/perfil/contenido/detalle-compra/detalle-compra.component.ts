import { Component, OnInit } from '@angular/core';
import { HistorialService } from '../../../../services/historial.service';
import { AuthService } from '../../../../services/auth.service';
import { UbicacionService } from '../../../../services/ubicacion.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styleUrls: ['./detalle-compra.component.css']
})

export class DetalleCompraComponent implements OnInit {
  datos = [];
  dataSource;
  cabezera;
  id:any;
  nombres:String;
  dni:string;
  email:string;
  celular:string;
  boleta:Boolean = true;
  constructor(historial:HistorialService, private authService:AuthService, private activatedRoute:ActivatedRoute, private u:UbicacionService) {
    this.id=this.activatedRoute.snapshot.params['id'];
    historial.getHistorial(authService.user.usu_dni).subscribe((data:any[])=>{
      this.datos = data;
      this.cabezera = this.datos.find((m)=>{return m.com_num  == this.id});
    });
    historial.getDetalle(this.id).subscribe(data=>{
      this.dataSource = data;
      console.log(this.dataSource);
    });
    this.nombres = authService.user.usu_apellidos + ' ' + authService.user.usu_nombres;
    this.dni = authService.user.usu_dni;
    this.email = authService.user.usu_email;
    this.celular = authService.user.usu_celular;
  }
  displayedColumns: string[] = ['pro_id', 'pro_nombre', 'dco_punitario', 'dco_cantidad','dco_subtotal'];
  
  ngOnInit(): void { }

}
