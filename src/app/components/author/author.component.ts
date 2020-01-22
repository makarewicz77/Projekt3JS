import { Component, OnInit } from '@angular/core';
import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
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
  styleUrls: ['./author.component.css']
})

export class AuthorComponent {
  authorId: number;
  author: Author;
  authors: Author[];
  constructor(private authorService: AuthorService) { }
  public getAuthor()
  {
    this.authorService.getAuthor(this.authorId).subscribe(author => this.author = author);
  }
  
}
