import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivateChild } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { AdminComponent } from './admin-component';
import { ProductoComponent } from './producto/producto.component';
import { CompraComponent } from './compra/compra.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DatosComponent } from './perfil/contenido/datos/datos.component';
import { PasswordComponent } from './perfil/contenido/password/password.component';
import { ComprasComponent } from './perfil/contenido/compras/compras.component';
import { DetalleCompraComponent } from './perfil/contenido/detalle-compra/detalle-compra.component';
import { AuthGuard } from '../guards/auth.guard';


const routes:Routes =[
  {
    path:"",
    component:AdminComponent,
    
    children:[
      {path:'principal', component:PrincipalComponent},
      {path:'producto/:id', component:ProductoComponent},
      {path:'compra', component:CompraComponent,canActivate:[AuthGuard], },
      
    ]
  },
  {path:'auth',component:AuthenticationComponent},
  { path:'perfil', component:PerfilComponent,
    canLoad:[AuthGuard],
    canDeactivate:[AuthGuard],
    canActivateChild:[AuthGuard],
    
    children:[
      { path:'datos', component:DatosComponent },
      { path:'contraseña', component:PasswordComponent },
     
      { path:'compras', component:ComprasComponent },
      { path:'detalleCompra', component:DetalleCompraComponent }

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
