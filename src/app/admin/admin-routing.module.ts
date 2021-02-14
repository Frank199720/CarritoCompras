import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { AdminComponent } from './admin-component';
import { ProductoComponent } from './producto/producto.component';

const routes:Routes =[
  {
    path:"",
    component:AdminComponent,
    children:[
      {path:'principal', component:PrincipalComponent},
      {path:'producto/:id', component:ProductoComponent}
      
    ]
  }
  
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AdminRoutingModule { }
