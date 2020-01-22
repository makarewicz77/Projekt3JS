import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface BookData {
  id: number;
  title: string;
  author: string;
  pages: number;
  type: string;
}

@Component({
  selector: 'app-dialog-box-book',
  templateUrl: './dialog-box-book.component.html',
  styleUrls: ['./dialog-box-book.component.css']
})
export class DialogBoxBookComponent {

  action:string;
  local_data:any;
 
  constructor(
    public dialogRef: MatDialogRef<DialogBoxBookComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: BookData) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }
 
  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
