import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-headerp',
  templateUrl: './headerp.component.html',
  styleUrls: ['./headerp.component.css']
})
export class HeaderpComponent implements OnInit {

  constructor(public AuthService:AuthService) { }

  ngOnInit(): void {
  }

}
