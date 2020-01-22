import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule, MatFormFieldModule, MatSortModule, MatSort, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PersonComponent } from './components/person/person.component';
import { BookComponent } from './components/book/book.component';
import { AuthorComponent } from './components/author/author.component';
import { DialogBoxBookComponent } from './dialog-boxes/dialog-box-book/dialog-box-book.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomePageComponent } from './components/home-page/home-page.component';
// Some imports for menu modules

@NgModule({
  declarations: [
    AppComponent,
    DialogBoxComponent,
    PersonComponent,
    BookComponent,
    AuthorComponent,
    DialogBoxBookComponent,
    HomePageComponent,
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
    HttpClientModule,
    MatToolbarModule,
    MatSortModule,
    FlexLayoutModule
  ],
  entryComponents :
  [
    DialogBoxComponent,
    DialogBoxBookComponent
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
