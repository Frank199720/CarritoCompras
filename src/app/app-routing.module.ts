import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './global/error/error.component';

const routes: Routes =[
  
  {
    path:'shop',
    loadChildren:()=> import('./admin/admin.module').then(m=>m.AdminModule)
  },
  {
    path:'404',
    component: ErrorComponent
  },
  {
    path:'**',
    redirectTo:'shop/principal'
  },
  
  
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
