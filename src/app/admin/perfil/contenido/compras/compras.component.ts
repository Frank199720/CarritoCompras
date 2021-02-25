import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../interfaces/user';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  prueba = []
  public usuario:User;
  constructor() { }

  ngOnInit(): void {
    let items = localStorage.getItem("arreglo");
    this.prueba = JSON.parse(items);
  }

}
