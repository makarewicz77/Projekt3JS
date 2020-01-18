import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableClientComponent } from './table-client';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: 'table-client', component: TableClientComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
