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



@NgModule({
  declarations: [PrincipalComponent,
    HeaderComponent,
    SidebarComponent,
    AdminComponent,
    ProductoComponent,
    ProductoindiComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FlexLayoutModule,
    MaterialModule
  ]
})
export class AdminModule { }
