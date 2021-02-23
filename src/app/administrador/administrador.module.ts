import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderAdminComponent } from './master/header-admin/header-admin.component';
import { SidebarAdminComponent } from './master/sidebar-admin/sidebar-admin.component';
import { AccessComponent } from './adminLogin/access/access.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { AdministradorComponent } from './administrador-component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    ProductsComponent,
    CategoriesComponent,
    ClientsComponent,
    DashboardComponent,
    HeaderAdminComponent,
    SidebarAdminComponent,
    AccessComponent,
    
    AdministradorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    AdministradorRoutingModule,
    AgGridModule.withComponents([])
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AdministradorModule {}
