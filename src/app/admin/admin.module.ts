import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AdminComponent } from './admin-component';
import { ProductoComponent } from './producto/producto.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { ProductoindiComponent } from './producto/productoindi/productoindi.component';

import { ImagenPipe } from './producto/pipes/imagen.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarritoComponent } from './producto/carrito/carrito.component';
import { CompraComponent } from './compra/compra.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HeaderpComponent } from './perfil/headerp/headerp.component';
import { SidebarpComponent } from './perfil/sidebarp/sidebarp.component';
import { DatosComponent } from './perfil/contenido/datos/datos.component';
import { PasswordComponent } from './perfil/contenido/password/password.component';
import { ComprasComponent } from './perfil/contenido/compras/compras.component';
import { DetalleCompraComponent } from './perfil/contenido/detalle-compra/detalle-compra.component';





@NgModule({
  declarations: [PrincipalComponent,
    HeaderComponent,
    SidebarComponent,
    AdminComponent,
    ProductoComponent,
    ProductoindiComponent,
    ImagenPipe,
    CarritoComponent,
    CompraComponent,
    AuthenticationComponent,
    PerfilComponent,
    HeaderpComponent,
    SidebarpComponent,
    DatosComponent,
    PasswordComponent,
    ComprasComponent,
    DetalleCompraComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
