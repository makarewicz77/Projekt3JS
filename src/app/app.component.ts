import { Component, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort'
export interface UsersData {
  id: number;
  name: string;
  surname: string;
  pesel: number;
}

//const ELEMENT_DATA: UsersData[] = getProfile();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
 
  title = 'Projekt3JS';
}
