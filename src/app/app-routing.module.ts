import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormInfoComponent } from './form-info/form-info.component';

const routes: Routes = [
  {
    path:'', redirectTo:'forminfo', pathMatch:'full'
  },
  {
    path:'', component: FormInfoComponent
  },
  { 
    path: '**', redirectTo: 'forminfo' , pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
