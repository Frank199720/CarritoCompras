import { Component, OnInit ,Input} from '@angular/core';
import { CarService } from '../../../../services/car.service';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {
  @Input() producto;
  last_array =[];
  new_array=[];
  constructor(private carService:CarService) { }

  ngOnInit(): void {
  }
  removeItem(){
    this.last_array=JSON.parse(localStorage.getItem('arreglo'));
    this.new_array=[];
    this.last_array.forEach(element => {
      if(element.pro_id!=this.producto.pro_id){
        this.new_array.push(element);
      }else{
        this.carService.numeroVentas=this.carService.numeroVentas-element.pro_cantidad_elegida;
      }
      
    });
    localStorage.removeItem('arreglo');
    localStorage.setItem('arreglo',JSON.stringify(this.new_array));
    this.carService.addCarrito();
    this.carService.actualizarVenta();
  }
}
