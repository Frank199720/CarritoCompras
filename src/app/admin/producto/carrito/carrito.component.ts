import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../../../services/car.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(public carritoService:CarService, private router:Router) { }

  compras=[];

  ngOnInit(): void {
    
    let items = localStorage.getItem("arreglo");
    this.compras = JSON.parse(items);
    console.log(this.compras);
    this.carritoService.addCarrito();
  }
  
  goToShop(){
    this.router.navigateByUrl('/shop/compra');
  }

}
