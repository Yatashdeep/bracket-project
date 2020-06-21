import { Component, OnInit ,EventEmitter, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormArray,FormControl} from '@angular/forms';
import * as moment from 'moment'; 
import{Subscription, from}from'rxjs'
import{EventNameComponent}from'../event-name/event-name.component'
import{EventnameService}from'../../eventname.service'
import{BracketstatusService}from'../../bracketstatus.service'
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material';
export interface Food {
  value: number;
  viewValue: number;
  }
@Component({
  selector: 'app-create-new-bracket',
  templateUrl: './create-new-bracket.component.html',
  styleUrls: ['./create-new-bracket.component.css'],
  outputs:['childChanged']
})
export class CreateNewBracketComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper; 

  subscription:Subscription
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  options: FormGroup;
  selected = 'option1';
  venues = 'allvenues';
  teams='2';
  isLinear
  ChildValue:string
  childChanged=new EventEmitter<string>();
  teamsoption=[]

  
VenueDateArr;
VenueDateArrHtml;
seasons: string[] = ['Teams List','Bracket-Losing Team','Bracket-Winning Team','Pool & Bracket-Combined','No Team (Bye)'];
timeDetail= {hour: 10, minute: 10, second: 0};  
countDetail=0;
timerDetail:boolean=false;
bracket:any[]=[];

selectedtop
selectedbottom
matchupnumber=[]

formGroup : FormGroup;
  form: FormArray;
  detail:boolean
  matchupid
  one
  matchupteamnumber
  message:string;
  favoriteSeason

  bracketteams
  formfeild
  formfeild1

  isEditable = false;
  finalarrayvenue
  topbracketteams
  bottombracketteams

  dublicatebracket=[]

  BtnDisableNext:boolean=false;  
  constructor(private _snackBar: MatSnackBar,public bracketservice:BracketstatusService,public eventnames:EventnameService,public eventname:EventNameComponent,private _formBuilder: FormBuilder) {
    this.teamsoption=[2,4,5,6,7,8,9,10,11,12,13,16]
    this.detail=false
    this.matchupid=1
    this.bracketteams="value1"
    this.formfeild=true
    this.formfeild1=true
  }

  onKeypress(events) {
    console.log("keypress==",events.target.value);
  }

  onChangeName(ev) {
    console.log("ev.target.value==",ev.target.value,"==");
    if(ev.target.value=="") {
      console.log("ev.target.value if==",ev.target.value);
      this.BtnDisableNext=true; 
    }
    else {
      console.log("ev.target.value1==",ev.target.value);
      this.BtnDisableNext=false; 
    }
  } 

  onChanges(mrChange: MatRadioChange) {

console.log('mrchange',mrChange.value)
if(mrChange.value=="3")
{
  this.formfeild=false
}
else if(mrChange.value=="1")
{
  this.formfeild=true
}
  }
  onChanges2(mrChange: MatRadioChange) {

    console.log('mrchange',mrChange.value)
    if(mrChange.value=="6")
    {
      this.formfeild1=false
    }
    else if(mrChange.value=="4")
    {
      this.formfeild1=true
    }
      }
  ServerTimestamp(nowDate) {
    return moment(nowDate).format("MMM, DD/YY");  
  } 
  
  someMethod(event)
  {
     if(event=='option1')
     {
      this.teamsoption=[2,4,5,6,7,8,9,10,11,12,13,16]
      console.log('teamsoption',this.teamsoption)
     }
     else  if(event=='option2')
     {
      this.teamsoption=[4,5,6,7,8,9,10,11,12,13,14,15,16]
      console.log('teamsoption',this.teamsoption)
     }
     else  if(event=='option3')
     {
      this.teamsoption=[4,5,6,7,8,9,10,11,12,13,14,15,16]
      console.log('teamsoption',this.teamsoption)
     }
     else  if(event=='option4')
     {
      this.teamsoption=[7]
      console.log('teamsoption',this.teamsoption)
     }
     else  if(event=='option5')
     {
      this.teamsoption=[4,6,7,8,10,12,16]
      console.log('teamsoption',this.teamsoption)
     }

  }
  changeteam(event)
  {
    console.log('event',event)

    console.log('formlength',this.form.length)
    
   
   
  
  console.log('form',this.form.length)

  if(this.form.length!=0){
    for(var  i=0;i<this.form.controls.length;i++) {
      const control = <FormArray>this.formGroup.get('form');
      control.removeAt(i);      
    }  
  }
 
     if(event==2)
     {
         this.matchupteamnumber=1
     }
     else if(event==4)
     {
         this.matchupteamnumber=2
     }
     else if(event==5)
     {
          this.matchupteamnumber=3
     }
     else if(event==6)
     {
           this.matchupteamnumber=4
     }
     else if(event==7)
     {
          this.matchupteamnumber=4
     }
     else if(event==8)
     {
           this.matchupteamnumber=4
     }
     else if(event==9)
     {
          this.matchupteamnumber=5
     }
     else if(event==10)
     {
           this.matchupteamnumber=6
     }
     else if(event==11)
     {
          this.matchupteamnumber=7
     }
     else if(event==12)
     {
           this.matchupteamnumber=8
     }
     else if(event==13)
     {
           this.matchupteamnumber=8
     }
     else if(event==16)
     {
           this.matchupteamnumber=8
     }

     this.formGroup = this._formBuilder.group({
      form : this._formBuilder.array([this.init()])
    })  
    var arraytmp=this.formGroup.get('form') as FormArray;
    for(var i=0;i<this.matchupteamnumber;i++){
      arraytmp.push(this.init());
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
     /*
if(this.form.length!=0)
{
     for(var  i=0;i<this.form.length;i++)
     {
      this.form.removeAt(i)  
    }
 
  }
    
   
   
      for(var i=0;i<this.matchupteamnumber;i++)
      {
     this.form.push(this.init());
      }
     */ 
     
    }
    init(){
      return this._formBuilder.group({
        cont :new FormControl('', [Validators.required]),
      })
    }
    ngOnChanges()
    {
      console.log('change bracket')
     
    }
    method()
    {
      console.log('got some')
    }


    nextsteup(i,stepper: MatStepper)
    {
     // this.matchupid=i+1
     console.log('--',i)
      this.bracketservice.currentMessage.subscribe(message => {
        this.message = message
        console.log('message',this.message)
     
      })
      console.log('topbracketteams',this.topbracketteams)
       
      this.finalarrayvenue=JSON.parse(localStorage.getItem('FinalArrayVenue'))
     
      if(this.finalarrayvenue==null)
      {
         
        this._snackBar.open('There was a problem finding available time slots for all matchups. Review your schedule to make sure you have enough time available.', 'Error', {
          duration: 10000,
        });  
       
      } 
    
      else if(i==0)   
      { 
        this.matchupid=i+1;   
           this.detail=true
          stepper.next();
      }  
    
       
     
      
   console.log(this.matchupid)
    
      
    if(this.matchupid>=1)
    {
      
      
      if(this.topbracketteams==null )
      {
        if(this.matchupid!=1)
        {
        this._snackBar.open('You must select a top team.', 'Missing Team', {
          duration: 5000,
        });
      }
      }
    
      else if(this.bottombracketteams==null)
      {


        if(this.message=='active')
        {
          stepper.next();
          this.matchupid=i+1
        }
        else 
        {
          if(this.matchupid!=1)
          {
        this._snackBar.open('You must select a bottom team.', 'Missing Team', {
          duration: 5000,
        });
      }

      }
     
     
      }
      else if(this.formfeild==false && this.formfeild1==false)
        {
          this._snackBar.open('Both teams may not be skipped. You must select at least 1 team.', 'Invalid Team', {
            duration: 5000,
          });
        }
       else if(this.topbracketteams==this.bottombracketteams)
      {
        this._snackBar.open('The bottom team you selected is already in the bracket. You must select a different team.', 'Invalid Team', {
          duration: 5000,
        });
      }
      
      else
      {
        
        console.log('new-bracket')
        // console.log('type',this.matchupid)
        var count1=0
        var count2=0
         this.dublicatebracket.push({'topbracketteams':this.topbracketteams,
         'bottombracketteams':this.bottombracketteams})
         console.log('dublicate',this.dublicatebracket)
         console.log('annnn',this.dublicatebracket.length)
         if(this.dublicatebracket.length>1)
         {
         for(var j=0;j<this.dublicatebracket.length;j++)
         {
             
            if(this.dublicatebracket[j].topbracketteams==this.topbracketteams)
           {
             
           count1++
              if(count1==2)
              {
              
              this._snackBar.open('The top team you selected is already in the bracket. You must select a different team.', 'Invalid Team', {
                  duration: 5000,
                   });
              }
           }
          else  if(this.dublicatebracket[j].topbracketteams==this.topbracketteams)
           {
            
            count2++
            if(count2==2)
            {
             this._snackBar.open('The bottom team you selected is already in the bracket. You must select a different team.', 'Invalid Team', {
               duration: 5000,
                });
            }
             
     
           }
          //  else {
          //   this.matchupid=i+1
          //    console.log('hiiiiiiiiiiiiiii')
          //    stepper.next();
          //  }
           
          
     
     
         }
        }
        else
        {
          stepper.next();
          this.matchupid=i+1
        }
    
      }
     

     
  
    
     }
  //  var count1=0
  //  var count2=0
  //   this.dublicatebracket.push({'topbracketteams':this.topbracketteams,
  //   'bottombracketteams':this.bottombracketteams})
  //   console.log('dublicate',this.dublicatebracket)
  //   for(var j=0;j<this.dublicatebracket.length;j++)
  //   {
        
  //      if(this.dublicatebracket[j].topbracketteams==this.topbracketteams)
  //     {
        
  //     count1++
  //        if(count1==2)
  //        {
         
  //        this._snackBar.open('The top team you selected is already in the bracket. You must select a different team.', 'Invalid Team', {
  //            duration: 5000,
  //             });
  //        }
  //     }
  //      if(this.dublicatebracket[j].topbracketteams==this.topbracketteams)
  //     {
       
  //      count2++
  //      if(count2==2)
  //      {
  //       this._snackBar.open('The bottom team you selected is already in the bracket. You must select a different team.', 'Invalid Team', {
  //         duration: 5000,
  //          });
  //      }
        
  //     }
      
     


  //   }
          

       }


       backsteup(i,stepper: MatStepper) {  
        this.matchupid=i-1;  
        
        if(i-1==0){  
          this.detail=false;
        }
        else {
          stepper.previous();
        }
      }
    addItem(even?){
      console.log('eee',even)
      this.form = this.formGroup.get('form') as FormArray;
      this.form.push(this.init());
        //  for(var i=0;i<even;i++)
        //  {
        // this.form.push(this.init());
        //  }
    }
  ngOnInit() {
    // this.bracketservice.currentMessage.subscribe(message => {
    //   this.message = message
    //  alert('create'+this.message)
    // })
    this.formGroup = this._formBuilder.group({
      form : this._formBuilder.array([this.init()])
    }) 
    this.addItem();
    
   
    this.eventnames.currentmessage.subscribe(data=>{
      console.log('data',data)
      this.bracket=JSON.parse(data)
    })
        console.log('bracket',this.bracket)
this.VenueDateArr=JSON.parse(localStorage.getItem('VenueDateArr')); 
this.VenueDateArr.forEach((value) => { 
  var dateval= moment(value.dateval).format("MMM, DD/YY");
  console.log("dateval==",dateval); 
   // this.VenueDateArrHtml.push({ value: dateval });   
   });    
this.timeDetail=JSON.parse(localStorage.getItem('timeDetail'));
  console.log('VenueDateArr',JSON.parse(localStorage.getItem('VenueDateArr')));   
  console.log('timeDetail',JSON.parse(localStorage.getItem('timeDetail')));  
  
  
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required],
    //   hideRequired: false,

    // });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      hideRequired: false,
      teams: ['', Validators.required], 
  timeDetail : [this.timeDetail, Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  onChange(ev){ 
    this.timeDetail=ev;  
  }
  
  timerfunc() {
    this.countDetail++
    if(this.countDetail%2==0) {
    this.timerDetail=false
    }
    else{
    this.timerDetail=true
    }
  }
  triggerResize1()
  {
console.log('topbracketteams',this.topbracketteams)



}

  
}
