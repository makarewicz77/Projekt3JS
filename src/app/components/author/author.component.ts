import { Component, ViewChild, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  constructor(private authorService: AuthorService) {
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
}
