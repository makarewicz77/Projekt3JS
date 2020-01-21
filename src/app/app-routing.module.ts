import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonComponent } from './components/person/person.component';
import { BookComponent } from './components/book/book.component';
import { AuthorComponent } from './components/author/author.component';


const routes: Routes = [
  { path: 'person', component: PersonComponent },
  { path: 'book', component: BookComponent },
  { path: 'author', component: AuthorComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
