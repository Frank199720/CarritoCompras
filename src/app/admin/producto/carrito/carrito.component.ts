import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../../../services/car.service';
import { Producto } from '../../../interfaces/producto';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(public carritoService:CarService, private router:Router) { 
    this.carritoService.actualizarVenta();
  }
  public items:number=0;
  public totalNormal:number;

  ngOnInit(): void {
    
    this.items=0;
    this.totalNormal=0;
    this.carritoService.addCarrito();
    
    
  }
  
  goToShop(){
    this.router.navigateByUrl('/shop/compra');
  }

}
