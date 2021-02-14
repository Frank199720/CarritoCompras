import { Component, Input, OnInit } from '@angular/core';
import { Prueba } from 'src/app/interfaces/prueba';

@Component({
  selector: 'app-productoindi',
  templateUrl: './productoindi.component.html',
  styleUrls: ['./productoindi.component.css']
})
export class ProductoindiComponent implements OnInit {

  constructor() { }
  @Input() prueba!:Prueba;
  ngOnInit(): void {
    
  }
  addtoCar(){
    console.log(this.prueba);
  }
}
