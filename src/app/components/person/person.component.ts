import { Component, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from '../../dialog-box/dialog-box.component';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort'

export interface UsersData {
  id: number;
  name: string;
  surname: string;
  pesel: number;
}

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent{

  displayedColumns: string[] = ['id', 'name', 'surname','pesel','action'];
  dataSource : Observable<Array<UsersData>>;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @ViewChild(MatSort,{static:true}) sort: MatSort;

  id:number;
  author:string ='';
 
  constructor(private httpClient:HttpClient,public dialog: MatDialog)
  {
    this.dataSource = this.getProfiles();
    console.log(this.dataSource);
  }
  getProfiles(): Observable<any>{
    return this.httpClient.get('http://localhost:3000/profile')
     }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
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
    this.httpClient.post<UsersData>('http://localhost:3000/profile',
    {  
    id:row_obj.id,
    name:row_obj.name,
    surname:row_obj.surname,
    pesel:row_obj.pesel
    })
    .subscribe(
      {
        complete: () =>
        this.dataSource = this.getProfiles()
      }
    );
   
  }
  updateRowData(row_obj)
  {
      this.httpClient.put('http://localhost:3000/profile/'+row_obj.id,
      {  
        id:row_obj.id,
        name:row_obj.name,
        surname:row_obj.surname,
        pesel:row_obj.pesel
        }
      )
      .subscribe(
        {
        complete: () =>
        this.dataSource = this.getProfiles()
        }
      );
  }
  deleteRowData(row_obj)
  {
      const url = 'http://localhost:3000/profile/'+row_obj.id
      this.httpClient.delete(url)
      .subscribe(
        {
        complete: () =>
        this.dataSource = this.getProfiles()
        }
      );
  }
  title = 'Projekt3JS';
}
