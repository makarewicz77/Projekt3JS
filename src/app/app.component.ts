import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
export interface UsersData {
  id: number;
  name: string;
  surname: string;
  pesel: number;
}
const ELEMENT_DATA: UsersData[] = [
  {id: 1, name: 'Maciej', surname: 'Parfieńczyk', pesel:12345678910},
  {id: 2, name: 'Maciej2',surname: 'Parfieńczyk2',pesel:12345678910},
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  displayedColumns: string[] = ['id', 'name', 'surname','pesel','action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  
  id:number;
  author:string ='';
 
  constructor(private httpClient:HttpClient,public dialog: MatDialog){
  }
  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });
 
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
  addRowData(row_obj){
    var d = new Date();
    this.dataSource.push({
      id:row_obj.id,
      name:row_obj.name,
      surname:row_obj.surname,
      pesel:row_obj.pesel,
    });
    this.table.renderRows();
  }
    updateRowData(row_obj){
      this.dataSource = this.dataSource.filter((value,key)=>{
        if(value.id == row_obj.id){
          value.name = row_obj.name;
          value.surname = row_obj.surname;
          value.pesel = row_obj.pesel;
        }
        return true;
      });
    }
    deleteRowData(row_obj){
      this.dataSource = this.dataSource.filter((value,key)=>{
        return value.id != row_obj.id;
      });
    }

  getProfile()
  {
    this.httpClient.get('http://localhost:3000/posts')
    .subscribe(
      (data:any[]) =>
        {
          this.author = data[1].author;
          alert(this.author);
        });
  }
  title = 'Projekt3JS';
}
