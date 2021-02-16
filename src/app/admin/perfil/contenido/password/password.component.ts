import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  
  hide = true;
  hide1 = true;
  hide2 = true;
  change:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
