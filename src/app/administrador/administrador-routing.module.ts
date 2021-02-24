import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessComponent } from './adminLogin/access/access.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { AdministradorComponent } from './administrador-component';

const routes: Routes = [
  {
    path:'', component:AccessComponent

  },
  {
    path:'pag',
    component:AdministradorComponent,
    children:[
      {path:'',component: DashboardComponent},
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
