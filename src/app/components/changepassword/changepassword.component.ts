import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators,AbstractControl} from '@angular/forms';
import{SecurityServiceService}from'../../security-service.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import { from } from 'rxjs';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  public href: string = "";
  decodeduri
  getid
  id
  changepasswordForm:FormGroup
  submitAttempt
  hide
  hide1
  constructor(private _snackBar: MatSnackBar,private router: Router,private _formBuilder: FormBuilder,public security:SecurityServiceService) { }

  ngOnInit() {
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;
    this.href = this.router.url;
    
    this.decodeduri=decodeURIComponent(this.href)
    this.getid=this.decodeduri.split("changepassword?id=")
   
    this.id=atob(this.getid[1])
    this.changepasswordForm=this._formBuilder.group({
      Password:['',Validators.compose([Validators.maxLength(30),Validators.pattern(passwordRegex),Validators.minLength(1),Validators.required])],
      ConfirmPassword:['',Validators.required]
    },
    {
      validator: ChangepasswordComponent.MatchPassword
    })
  }
  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('Password').value; // to get value in input tag
    let confirmPassword = AC.get('ConfirmPassword').value; // to get value in input tag
     if(password != confirmPassword) {
         console.log('false');
         AC.get('ConfirmPassword').setErrors( {MatchPassword: true} )
     } else {
         console.log('true');
         return null
     }
 }
  changepassword()
  {
    this.security.changepassword(this.id,this.changepasswordForm.controls['Password'].value).subscribe(data=>{
      console.log(data)
      this.openSnackBar((<any>data).mesg,'Status')
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
