import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivateChild } from '@angular/router';
import { AccessComponent } from './adminLogin/access/access.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { AdministradorComponent } from './administrador-component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  
  {
    path:'pag',
    component:AdministradorComponent,
    canActivate:[AdminGuard],
    canLoad:[AdminGuard],
    canActivateChild:[AdminGuard],
    children:[
      {path:'',component: DashboardComponent},
      {path:'dashboard',component: DashboardComponent},
      {path:'categories',component:CategoriesComponent},
      {path:'marcas',component:MarcasComponent},
      {path:'products',component:ProductsComponent},
      {path:'clients',component:ClientsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
