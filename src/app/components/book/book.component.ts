import { Component, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxBookComponent } from '../../dialog-boxes/dialog-box-book/dialog-box-book.component';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort'


export interface BookData {
  id: number;
  title: string;
  author: string;
  pages: number;
}
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent  {

  displayedColumns: string[] = ['id', 'title', 'author','pages','action'];
  dataSource : Observable<Array<BookData>>;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
 
  constructor(private httpClient:HttpClient,public dialog: MatDialog)
  {
    this.dataSource = this.getBooks();
    console.log(this.dataSource);
  }
  getBooks(): Observable<any>{
    return this.httpClient.get('http://localhost:3000/book')
     }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxBookComponent, {
      width: '320px',
      data:obj
    })
    
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }
  addRowData(row_obj)
  {
    this.httpClient.post<BookData>('http://localhost:3000/book',
    {  
    id:row_obj.id,
    title:row_obj.title,
    author:row_obj.author,
    pages:row_obj.pages
    })
    .subscribe(
      {
        complete: () =>
        this.dataSource = this.getBooks()
      }
    );
   
  }
  updateRowData(row_obj)
  {
      this.httpClient.put('http://localhost:3000/book/'+row_obj.id,
      {  
        id:row_obj.id,
        title:row_obj.title,
        author:row_obj.author,
        pages:row_obj.pages
        }
      )
      .subscribe(
        {
        complete: () =>
        this.dataSource = this.getBooks()
        }
      );
  }
  deleteRowData(row_obj)
  {
      const url = 'http://localhost:3000/book/'+row_obj.id
      this.httpClient.delete(url)
      .subscribe(
        {
        complete: () =>
        this.dataSource = this.getBooks()
        }
      );
  }


}
