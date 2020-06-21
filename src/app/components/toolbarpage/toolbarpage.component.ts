import { Component, OnInit, ViewChild,ElementRef} from '@angular/core';
import{SecurityServiceService}from'../../security-service.service' 
import{flatMap}from'rxjs/operators'
import { of, from } from 'rxjs';
import {FormBuilder, FormGroup, Validators,FormArray} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import{UserserviceServiceService}from'../../userservice-service.service'
import { RouterModule , Router,ActivatedRoute } from '@angular/router'
import{MatBottomSheet,MatBottomSheetRef}from'@angular/material/bottom-sheet';
//import{TermsandconditionComponent}from'../../termsandcondition/termsandcondition.component'
import { TermsandconditionsComponent } from '../../components/termsandconditions/termsandconditions.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import{LogindialogComponent}from'../../logindialog/logindialog.component'
declare var jquery:any;
declare var $ :any;
export interface DialogData {
  animal: string;
  name: string;
}
@Component({  
  selector: 'app-toolbarpage',
  templateUrl: './toolbarpage.component.html',
  styleUrls: ['./toolbarpage.component.css']
})
export class ToolbarpageComponent implements OnInit {
  animal: string;
  name: string;
  hide:boolean=false;
  firstFormGroup:FormGroup
  secondFormGroup:FormGroup
  thirdFormGroup:FormGroup
  demoFormControl:FormGroup
  loader:boolean
  spinnerDiameter: number = 1; // Set to a low number to avoid affecting the container height
  returnUrl: string;
  tokenstatus
@ViewChild('spinnerDiv') spinnerDiv: ElementRef;
@ViewChild('myModal') myModal :ElementRef;
public check
Username
Password
submitAttempt
  constructor(public dialog: MatDialog,private _bottomSheet: MatBottomSheet,private route: ActivatedRoute,public router:Router,public userservice:UserserviceServiceService,private _formBuilder: FormBuilder,public security:SecurityServiceService,private _snackBar: MatSnackBar) { 
    
    this.loader=true
    this.tokenstatus=this.userservice.isLogged();

  
    this.Username=localStorage.getItem('Username')
    this.Password=localStorage.getItem('Password')
  }


  onChkChange($event){
    
   console.log($event.checked);
this.check=$event.checked;
// if(this.check){

// this._bottomSheet.open(TermsandconditionsComponent);   

// }
// else{

// }

  }
  ngOnInit() {
    
    (<HTMLInputElement>document.getElementById('loginusrname')).value="";
    (<HTMLInputElement>document.getElementById('loginpassword')).value="";

    (<HTMLInputElement>document.getElementById('Firstname')).value="";
    (<HTMLInputElement>document.getElementById('Lastname')).value="";
    (<HTMLInputElement>document.getElementById('Email')).value="";
    (<HTMLInputElement>document.getElementById('Password')).value="";
    (<HTMLInputElement>document.getElementById('organizationName')).value="";
    (<HTMLInputElement>document.getElementById('Signcheck')).value="";  

    
    this.firstFormGroup = this._formBuilder.group({
      Username:['',Validators.required],
      Password:['',Validators.required]
    })
    let emailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;
    this.secondFormGroup=this._formBuilder.group({
      Firstname:['',Validators.required],
      Lastname:['',Validators.required],
      Email:['',Validators.compose([Validators.maxLength(50),Validators.pattern(emailRegex),Validators.minLength(1),Validators.required])],
      Password:['',Validators.compose([Validators.maxLength(30),Validators.pattern(passwordRegex),Validators.minLength(1),Validators.required])],
      organizationName:['',Validators.required],
      check: ['', Validators.required]

    })
    this.thirdFormGroup=this._formBuilder.group({
      Email:['',Validators.compose([Validators.maxLength(50),Validators.pattern(emailRegex),Validators.minLength(1),Validators.required])],
    })
    this.demoFormControl=this._formBuilder.group({
      Firstname:['',Validators.required],
      Lastname:['',Validators.required],
      Email:['',Validators.compose([Validators.maxLength(50),Validators.pattern(emailRegex),Validators.minLength(1),Validators.required])],
      phonenumber:['',Validators.required],
      OrganizationName:['',Validators.required]
   })
    
     this.userservice.isLogged()
     
    //  if(this.userservice.isLogged())
    //  {
    //   this.router.navigate(['//create-tournament'])
    //  }
     // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  
  login()
  {
    
  //  alert("login service"); 

    this.loader=false
    
    this.security.login(this.firstFormGroup.controls['Username'].value,this.firstFormGroup.controls['Password'].value).subscribe(data=>{
      console.log("data login==",data); 
      this.loader=true
      if((<any>data).mesg=='invalid email or password')
      {
        this.openSnackBar('Invalid Email or Password','Error')
      }
      else if((<any>data).mesg=='Deactive Your Account')
      {
          this.openSnackBar('Please verify your account by mail','Error')
      }
      else if((<any>data).token)
      {
        localStorage.setItem("token",data["token"]);  
        (<HTMLInputElement>document.getElementById('loginusrname')).value="";
        (<HTMLInputElement>document.getElementById('loginpassword')).value="";
        this.userservice.setToken((<any>data).token)
        this.tokenstatus=this.userservice.isLogged()
        this.router.navigate(['/show-tournament'])
        this.openSnackBar('Login Successfull','Active');
        this.GetUserDetail()  
      }
     
    })
  }

  GetUserDetail(){
    this.security.GetUser().subscribe(data =>{
      if(data["status"]=="200"){      
      localStorage.setItem("userid",data['user'].id);
      }  
    }) 
  }


  onstaysign($event)
  {
    console.log($event.checked)
    if($event.checked)
    {
      
      localStorage.setItem('Username',this.firstFormGroup.controls['Username'].value)
      localStorage.setItem('Password',this.firstFormGroup.controls['Password'].value)
    }
    else
    {
       localStorage.removeItem('Username')
       localStorage.removeItem('Password')
    }
  }
  signup()
  {
  this.openlogin(this.secondFormGroup.controls['Firstname'].value,
  this.secondFormGroup.controls['Lastname'].value,
  this.secondFormGroup.controls['Email'].value,
  this.secondFormGroup.controls['Password'].value,
  this.secondFormGroup.controls['organizationName'].value )
    // this.security.signup(this.secondFormGroup.controls['Firstname'].value,
    // this.secondFormGroup.controls['Lastname'].value,
    // this.secondFormGroup.controls['Email'].value,
    // this.secondFormGroup.controls['Password'].value,
    // this.secondFormGroup.controls['organizationName'].value 
    // ).subscribe(data=>{
    //   console.log('token',data)
    //   if((<any>data).mesg)
    //   {
    //     var msg=(<any>data).mesg
    //     this.openSnackBar(msg,'Status')
    //   }
    
    // })
  }
  openlogin(Firstname,Lastname,Email,Password,organizationName) {
    const dialogRef = this.dialog.open(LogindialogComponent, {
      width: '350px',
      data: {Firstname: Firstname,Lastname:Lastname,Email:Email,Password:Password,organizationName:organizationName}
    });
  
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  Logout()
  {
    localStorage.removeItem('TOKEN')
    
    this.tokenstatus=this.userservice.isLogged()
    this.openSnackBar('LogOut Succesfull','Status')
    this.router.navigate(['/Home'])

  }
  forgetpassword()
  {
    
    
    this.security.forgetpassword(this.thirdFormGroup.controls['Email'].value).subscribe(data=>{
      console.log(data)
      this.openSnackBar((<any>data).mesg,'Status')
    })

  }
  demosubmit()
  { 
    this.security.sendemail(this.demoFormControl.controls['Firstname'].value,
    this.demoFormControl.controls['Lastname'].value,
    this.demoFormControl.controls['Email'].value,
    this.demoFormControl.controls['phonenumber'].value,
    this.demoFormControl.controls['OrganizationName'].value
     ).subscribe(data=>{
       this.openSnackBar((<any>data).mesg,'Message')
       console.log(data); 
       (<HTMLInputElement>document.getElementById('Firstname')).value="";
       (<HTMLInputElement>document.getElementById('Lastname')).value="";
       (<HTMLInputElement>document.getElementById('Email')).value="";
       (<HTMLInputElement>document.getElementById('OrganizationName')).value="";
       (<HTMLInputElement>document.getElementById('phonenumber')).value="";
    })
  }
 
}
