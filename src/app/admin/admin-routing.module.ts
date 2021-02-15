import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { AdminComponent } from './admin-component';
import { ProductoComponent } from './producto/producto.component';
import { CompraComponent } from './compra/compra.component';
import { AuthenticationComponent } from './authentication/authentication.component';

const routes:Routes =[
  {
    path:"",
    component:AdminComponent,
    children:[
      {path:'principal', component:PrincipalComponent},
      {path:'producto/:id', component:ProductoComponent},
      {path:'compra', component:CompraComponent},
      
    ]
  },
  {path:'auth',component:AuthenticationComponent}
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
