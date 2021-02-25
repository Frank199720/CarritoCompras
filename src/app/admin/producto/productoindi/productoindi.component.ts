import { Component, Input, OnInit } from '@angular/core';
import { Prueba } from 'src/app/interfaces/prueba';
import { CarService } from 'src/app/services/car.service';
import { Producto } from '../../../interfaces/producto';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-productoindi',
  templateUrl: './productoindi.component.html',
  styleUrls: ['./productoindi.component.css'],
})
export class ProductoindiComponent implements OnInit {
  constructor(private carrito: CarService) {}
  @Input() producto!: Producto;
  ngOnInit(): void {
    this.producto.pro_cantidad_elegida = 0;
  }
  arreglo_last = [];
  arreglo_nuevo = [];
  addtoCar() {
    console.log(this.arreglo_nuevo);
    if (
      this.producto.pro_cantidad - this.producto.pro_cantidad_elegida <
      this.producto.pro_stock
    ) {
      this.showMessage('Error!', 'Cantidad no permitida', 'error');
    } else if (this.producto.pro_cantidad_elegida != 0) {
      let array = localStorage.getItem('arreglo');
      if (array) {
        var include = false;
        this.arreglo_last = JSON.parse(array);
        this.arreglo_nuevo=[];
        this.arreglo_last.forEach((element) => {
          if (element.pro_id == this.producto.pro_id) include = true;
          console.log(element);
          console.log(this.producto.pro_id);
        });
        if (include) {
          console.log("Está uno ya dentro");
          localStorage.removeItem('arreglo');
          
          this.arreglo_last.forEach((element) => {
            if (element.pro_id == this.producto.pro_id){
              
              this.carrito.numeroVentas =  this.carrito.numeroVentas - element.pro_cantidad_elegida;
              
              
            }
            
            else {
              console.log("Guardando los que no son repetidos");
              this.arreglo_nuevo.push(element);
            }
          });
          this.arreglo_nuevo.push(this.producto);
          console.log(this.arreglo_nuevo);
          localStorage.setItem('arreglo', JSON.stringify(this.arreglo_nuevo));
          this.carrito.addCarrito();
          this.carrito.numeroVentas =
            this.carrito.numeroVentas + this.producto.pro_cantidad_elegida;
        } else {
          let arrayx = localStorage.getItem('arreglo');
          this.arreglo_nuevo=JSON.parse(arrayx);
          console.log("Guardando si es que no hay existencia antes");
          
          this.arreglo_nuevo.push(this.producto);
          localStorage.setItem('arreglo', JSON.stringify(this.arreglo_nuevo));
          this.carrito.addCarrito();
          this.carrito.numeroVentas =
            this.carrito.numeroVentas + this.producto.pro_cantidad_elegida;
        }
      } else {
        console.log("Cuando guarda por primera vez");
        this.arreglo_nuevo.push(this.producto);
        localStorage.setItem('arreglo', JSON.stringify(this.arreglo_nuevo));
        this.carrito.addCarrito();
        this.carrito.numeroVentas =
          this.carrito.numeroVentas + this.producto.pro_cantidad_elegida;
      }
      //this.carrito.numeroVentas++;
      this.carrito.actualizarVenta();
    }
  }
  showMessage(title, text, icon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
}
