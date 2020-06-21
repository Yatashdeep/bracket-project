import { Component, OnInit , ViewChild,ElementRef,Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormArray} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { SecurityServiceService } from '../security-service.service';
export interface DialogData {
  Firstname: string;
  Lastname: string;
  Email: string;
  Password: string;
  organizationName:string
}
@Component({
  selector: 'app-logindialog',
  templateUrl: './logindialog.component.html',
  styleUrls: ['./logindialog.component.css']
})
export class LogindialogComponent implements OnInit {
  firstFormGroup:FormGroup
  @ViewChild('spinnerDiv') spinnerDiv: ElementRef;
  msg
  loader:boolean
  constructor(public security:SecurityServiceService,private _formBuilder: FormBuilder,public dialogRef: MatDialogRef<LogindialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
  
  }
close()
{
  this.dialogRef.close();
}
  ngOnInit() {
    this.loader=true
       this.security.signup(this.data.Firstname,
    this.data.Lastname,
    this.data.Email,
    this.data.Password,
    this.data.organizationName 
    ).subscribe(data=>{
      console.log('token',data)
      this.loader=false 
        this.msg=(<any>data).mesg
        
    
    })
  }

}
