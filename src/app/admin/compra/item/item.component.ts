import { Component, OnInit, Input } from '@angular/core';
import { CarService } from '../../../services/car.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input()
  item;
  
  constructor(public carService:CarService) { }

  ngOnInit(): void {
  }

  aumentar(){
    let productos = localStorage.getItem("arreglo");
    var array = JSON.parse(productos);
    //console.log(array);
    this.item++;
    
    localStorage.setItem("arreglo",JSON.stringify(array));
  }

  disminuir(){
    if(this.item != 1){
      this.item--;
    }
  }

}
