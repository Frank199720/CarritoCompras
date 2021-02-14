import { Component, OnInit } from '@angular/core';
import { Prueba } from 'src/app/interfaces/prueba';
import { PruebaService } from 'src/app/services/prueba.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  prueba: Prueba[]= [];
  termino:string;
  constructor( private pruebaService:PruebaService) { }
  
  ngOnInit(): void {
    
    this.pruebaService.getPrueba().subscribe((data: Prueba[]) => {
      this.prueba = data;
      
    });
    
  }
  buscando(){
    if(this.termino==''){
      this.pruebaService.getPrueba().subscribe((data: Prueba[]) => {
        this.prueba = data;
        
      });
    }
    this.pruebaService.getBusqueda(this.termino).subscribe((data: Prueba[]) => {
      this.prueba = data;
      
    });
    console.log("xd")
  }
  clear(){
    this.termino="";
    this.pruebaService.getPrueba().subscribe((data: Prueba[]) => {
      this.prueba = data;
      
    });
  }
}
