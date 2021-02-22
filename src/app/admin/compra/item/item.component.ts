import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input()
  item: number;
  constructor() { }

  ngOnInit(): void {
  }

  aumentar(){
    let productos = localStorage.getItem("arreglo");
    var array = JSON.parse(productos);
    //console.log(array);
    this.item++;
    array[1].edad=this.item;
    localStorage.setItem("arreglo",JSON.stringify(array));
  }

  disminuir(){
    if(this.item != 1){
      this.item--;
    }
  }

}
