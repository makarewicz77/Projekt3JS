import { Component, ViewChild, Input, OnInit, ChangeDetectorRef, AfterViewInit, AfterContentChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatTable, MatTableDataSource, MatPaginator } from '@angular/material';
import { DialogBoxComponent } from '../../dialog-box/dialog-box.component';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { rowsAnimation } from '../../template.animations';

export interface UsersData {
  id: number;
  name: string;
  surname: string;
  pesel: number;
}

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  animations: [rowsAnimation],
})
export class PersonComponent implements OnInit, AfterContentChecked {

  matTable: MatTableDataSource<UsersData>

  profiles = []
  displayedColumns: string[] = ['id', 'name', 'surname', 'pesel', 'action'];
  dataSource: Observable<Array<UsersData>>;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  id: number;
  author: string = '';
  ngAfterContentChecked() { this.matTable.sort = this.sort }
  constructor(private httpClient: HttpClient, public dialog: MatDialog, changeDetector: ChangeDetectorRef) {
    this.dataSource = this.getProfiles();
    this.dataSource.subscribe(
      response => {
        this.profiles = response;
        this.matTable = new MatTableDataSource(this.profiles)
      }
    )
    this.matTable = new MatTableDataSource(this.profiles)
    console.log(this.dataSource);
  }
  ngOnInit() {
    this.matTable.sort = this.sort;
  }
  getProfiles(): Observable<any> {
    return this.httpClient.get<UsersData[]>('http://localhost:3000/profile')
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '320px',
      data: obj
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }
  refresh() {
    this.dataSource = this.getProfiles();
    this.dataSource.subscribe(
      response => {
        this.profiles = response;
        this.matTable = new MatTableDataSource(this.profiles)
      }
    )
    this.matTable = new MatTableDataSource(this.profiles)
  };
  addRowData(row_obj) {
    this.httpClient.post<UsersData>('http://localhost:3000/profile',
      {
        id: row_obj.id,
        name: row_obj.name,
        surname: row_obj.surname,
        pesel: row_obj.pesel
      })
      .subscribe(
        {
          complete: () =>
            this.refresh()
        }
      );
  }

  updateRowData(row_obj) {
    this.httpClient.put('http://localhost:3000/profile/' + row_obj.id,
      {
        id: row_obj.id,
        name: row_obj.name,
        surname: row_obj.surname,
        pesel: row_obj.pesel
      }
    )
      .subscribe(
        {
          complete: () =>
            this.refresh()
        }
      );
  }
  deleteRowData(row_obj) {
    const url = 'http://localhost:3000/profile/' + row_obj.id
    this.httpClient.delete(url)
      .subscribe(
        {
          complete: () =>
            this.refresh()
        }
      );
  }

  public doFilter = (value: string) => {
    //this.dataSource.filter = 
    //return this.dataSource.subscribe(persons => persons.filter(p => p.name === value))
    this.matTable.filter = value.trim().toLocaleLowerCase();
    if (this.matTable.paginator) {
      this.matTable.paginator.firstPage();
    }
  }

  title = 'Projekt3JS';
}
