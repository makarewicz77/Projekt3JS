import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,MatFormFieldModule, } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { PersonComponent } from './components/person/person.component';
import { BookComponent } from './components/book/book.component';
import { AuthorComponent } from './components/author/author.component';
import { DialogBoxBookComponent } from './dialog-boxes/dialog-box-book/dialog-box-book.component';
// Some imports for menu modules

@NgModule({
  declarations: [
    AppComponent,
    DialogBoxComponent,
    PersonComponent,
    BookComponent,
    AuthorComponent,
    DialogBoxBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule
  ],
  entryComponents :
  [
    DialogBoxComponent,
    DialogBoxBookComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
