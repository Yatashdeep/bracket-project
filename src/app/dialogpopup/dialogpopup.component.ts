import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';


export interface DialogData {
  divisionname
}
@Component({
  selector: 'app-dialogpopup',
  templateUrl: './dialogpopup.component.html',
  styleUrls: ['./dialogpopup.component.css']
})
export class DialogpopupComponent implements OnInit {
  divisionname
  constructor( private _snackBar: MatSnackBar,public dialogRef: MatDialogRef<DialogpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() { 
  }

  onNoClickBtn(): void {
    if(this.divisionname == "" || this.divisionname==undefined){
      this._snackBar.open('No internet connection.', 'You are Offline', {  duration: 10000  });
      return;
    }
    this.dialogRef.close(this.divisionname); 
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
