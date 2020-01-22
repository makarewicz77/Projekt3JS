import { Component, ViewChild, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DialogBoxBookComponent } from '../../dialog-boxes/dialog-box-book/dialog-box-book.component';
import { map } from 'rxjs/operators';
import { MatDialog, MatTable, MatTableDataSource, MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { rowsAnimation } from '../../template.animations';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})

export class AuthorService {

  constructor(private httpService: HttpClient) {
  }
  public getAllAuthors(): Observable<Author[]> {
    return this.httpService.get<Author[]>(`http://localhost:3000/authors`).pipe(
      map(data => data.map(data => new Author().deserialize(data)))
    );
  }
  public getAuthor(id: number): Observable<Author> {
    return this.httpService.get<Author>(`http://localhost:3000/authors/${id}`).pipe(
      map(data => new Author().deserialize(data))
    );
  }
}

export interface Deserializable {
  deserialize(input: any): this;
}

export class Book implements Deserializable {
  id: number;
  title: string;
  author: string;
  pages: number;
  type: string;
  deserialize(input: any): this {
    return Object.assign(this, input);
  }

}
export class Author implements Deserializable {
  id: number;
  name: string;
  surname: string;
  public books: Book[];

  deserialize(input: any): this {
    Object.assign(this, input);
    this.books = input.books.map(book => new Book().deserialize(book));
    return this;
  }
}

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
  animations: [rowsAnimation],
})

export class AuthorComponent implements OnInit, AfterContentChecked {

  matTable: MatTableDataSource<Author>

  displayedColumns: string[] = ['name', 'surname', 'books'];

  authorId: number;
  author: Author;
  authors: Author[];

  dataSource: Observable<Array<Author>>;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngAfterContentChecked() { this.matTable.sort = this.sort }

  constructor(private authorService: AuthorService, private httpClient: HttpClient) {
    this.dataSource = authorService.getAllAuthors();
    this.dataSource.subscribe(
      response => {
        this.authors = response;
        this.matTable = new MatTableDataSource(this.authors)
      }
    )
    this.matTable = new MatTableDataSource(this.authors)
  }

  ngOnInit() {
    this.matTable.sort = this.sort;
  }

  public getAuthor() {
    this.authorService.getAuthor(this.authorId).subscribe(author => this.author = author);
  }

  public doFilter = (value: string) => {
    //this.dataSource.filter = 
    //return this.dataSource.subscribe(persons => persons.filter(p => p.name === value))
    this.matTable.filter = value.trim().toLocaleLowerCase();
    if (this.matTable.paginator) {
      this.matTable.paginator.firstPage();
    }
  }

  addRowData(row_obj) {
    this.httpClient.post<Author>('http://localhost:3000/book',
      {
        id: row_obj.id,
        name: row_obj.name,
        surname: row_obj.surname,
        books: row_obj.book
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

  refresh() {
    this.dataSource = this.authorService.getAllAuthors();
    this.dataSource.subscribe(
      response => {
        this.authors = response;
        this.matTable = new MatTableDataSource(this.authors)
      }
    )
    this.matTable = new MatTableDataSource(this.authors)
  };

  // openDialog(action, obj) {
  //   obj.action = action;
  //   const dialogRef = this.dialog.open(DialogBoxBookComponent, {
  //     width: '320px',
  //     data: obj
  //   })

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result.event == 'Add') {
  //       this.addRowData(result.data);
  //     } else if (result.event == 'Update') {
  //       this.updateRowData(result.data);
  //     } else if (result.event == 'Delete') {
  //       this.deleteRowData(result.data);
  //     }
  //   });
  // }
}
