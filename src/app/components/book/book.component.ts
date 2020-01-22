import { Component, ViewChild, Input, OnInit, ChangeDetectorRef, AfterViewInit, AfterContentChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatTable, MatTableDataSource, MatPaginator } from '@angular/material';
import { DialogBoxBookComponent } from '../../dialog-boxes/dialog-box-book/dialog-box-book.component';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { rowsAnimation } from '../../template.animations';

export interface BookData {
  id: number;
  title: string;
  author: string;
  pages: number;
  type: string;
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  animations: [rowsAnimation],
})

export class BookComponent implements OnInit, AfterContentChecked {

  matTable: MatTableDataSource<BookData>

  books = []
  displayedColumns: string[] = ['id', 'title', 'author', 'pages', 'type', 'action'];
  dataSource: Observable<Array<BookData>>;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngAfterContentChecked() { this.matTable.sort = this.sort }

  constructor(private httpClient: HttpClient, public dialog: MatDialog, changeDetector: ChangeDetectorRef) {
    this.dataSource = this.getBooks();
    this.dataSource.subscribe(
      response => {
        this.books = response;
        this.matTable = new MatTableDataSource(this.books)
      }
    )
    this.matTable = new MatTableDataSource(this.books)
    console.log(this.dataSource);
  }

  ngOnInit() {
    this.matTable.sort = this.sort;
  }

  getBooks(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/book')
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxBookComponent, {
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
    this.dataSource = this.getBooks();
    this.dataSource.subscribe(
      response => {
        this.books = response;
        this.matTable = new MatTableDataSource(this.books)
      }
    )
    this.matTable = new MatTableDataSource(this.books)
  };

  addRowData(row_obj) {
    this.httpClient.post<BookData>('http://localhost:3000/book',
      {
        id: row_obj.id,
        title: row_obj.title,
        author: row_obj.author,
        pages: row_obj.pages,
        type: row_obj.type
      })
      .subscribe(
        {
          complete: () =>
          this.refresh()
        }
      );

  }
  updateRowData(row_obj) {
    this.httpClient.put('http://localhost:3000/book/' + row_obj.id,
      {
        id: row_obj.id,
        title: row_obj.title,
        author: row_obj.author,
        pages: row_obj.pages,
        type: row_obj.type
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
    const url = 'http://localhost:3000/book/' + row_obj.id
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
}
