import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() departamento;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  redireccionar(){
    this.router.navigateByUrl('/shop/producto/' + this.departamento.dep_id);
  }
}
