import { Component, OnInit , NgZone, ElementRef, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormControl, FormArray} from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';

import {MatDialog} from '@angular/material/dialog';

import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';
import { EventNameComponent } from '../event-name/event-name.component';
import{SecurityServiceService}from'../../security-service.service' 
import * as moment from 'moment'; 
import {MatSnackBar} from '@angular/material/snack-bar';

// This lets me use jquery
declare var $: any;

@Component({   
selector: 'app-create-tournament',
templateUrl: './create-tournament.component.html',
styleUrls: ['./create-tournament.component.css']
})
export class CreateTournamentComponent implements OnInit { 

  display='none'; //default Variable

  VenueType:any;
  HasConcessions:any;  
  DetailisEditable:boolean = false; 
  DetailisEditable1:boolean = false; 
  DetailOptionGroup:any;
  VenuesFirstCtrl:any;


favoriteSeason

latitude: number;
longitude: number;
zoom: number;
address: string;
private geoCoder;
@ViewChild('search')
public searchElementRef: ElementRef;

addressComponets = {
street_number: 'short_name',
route: 'long_name',
locality: 'long_name',
administrative_area_level_1: 'long_name',
country: 'long_name',
postal_code: 'short_name',
administrative_area_level_2:'long_name',
sublocality_level_1:'long_name'
};

CountryVenue:any;

VenueCountry:any;
VenuePostal 
VenueState 
VenueCity
VenueAddress
VenueAbbr
VenueName
VenueDateArr

public addresses=[] ;

timer:boolean
time = {hour: 13, minute: 30};
count=0


timerDetail:boolean;  
timeDetail = { hour: 10, minute: 10, second: 0 };  
countDetail=0;
meridianDetail:boolean =false;

timerVenueStart:boolean;    
timeVenueStart = { hour: 10, minute: 10, second: 0 };  
countVenueStart=0;

timerVenueEnd:boolean;  
timeVenueEnd = { hour: 10, minute: 10, second: 0 };  
countVenueEnd=0;

isLinear = false;
firstFormGroup: FormGroup;
secondFormGroup: FormGroup;
VenueFormGroup:FormGroup;
CourtFormGroup:FormGroup;
DetailFormGroup:FormGroup
AdministrativeFormGroup:FormGroup;
DivisionFormGroup:FormGroup;
VenuesFormGroup:FormGroup;
VenueDateFormGroup:FormGroup;
otherFormGroup:FormGroup;
public usersForm: FormGroup;
selectedFile:any=null;
logo
date = new FormControl(new Date()); 
serializedDate = new FormControl((new Date()).toISOString());
tiles=[];
//tiles=[{categories:'Basketball',countries:'USA'},{categories:'Softball',countries:'UK'},{categories:'Hockey',countries:'Canada'},{categories:'Soccer'},{categories:'Baseball'}];

radios = [{venueid:"1",venue:'I do not know',concessions:'I do not know'},{venueid:"2",venue:'Indoors',concessions:'Yes'},{venueid:"3",venue:'Outdoors',concessions:'No'}]
 emailRegex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";

 FinalArrayVenues:any=[];

 DetailEndDate
 DetailStartDate

 event_detailServer=[];
 administrative_Server=[];
 selectedFileName:any=""; 
 Venue_Server=[];
constructor(private _formBuilder: FormBuilder, private mapsAPILoader: MapsAPILoader,private ngZone: NgZone,public router: Router,public dialog: MatDialog,public security:SecurityServiceService,private _snackBar: MatSnackBar) {  
  this.FinalArrayVenues=[];   
  this.tiles=[];
  this.Venue_Server=[];
  this.security.CheckInternetCoonection().subscribe(isOnline => {
    if(isOnline){ this.ConstructorFun(); }
    else {   this._snackBar.open('Internal Server Error', 'Error', {  duration: 10000  });    }
  }); 
}

ConstructorFun(){
  this.security.GetSportIDconfig().subscribe(data =>{ 
    if(data["status"]=="200"){   
      this.tiles=data["sport"];  
    }
  }) 
}

getDateArray(start, end) {
  var arr = new Array();
  var dt = new Date(start);
  while (dt <= end) {
      arr.push({dateval:this.getdateFormat(new Date(dt)),timeVenueStart:this.timeVenueStart,timeVenueEnd:this.timeVenueEnd,ToggleSlide:false});
      dt.setDate(dt.getDate() + 1);
  } 
  return arr;
}

getdateFormat(today){
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) {
    dd='0'+dd;
} 
if(mm<10) {
    mm='0'+mm;
} 
today = mm+'/'+dd+'/'+yyyy;
return today;
}

getdateFormat1(today){
  return moment(today).format("DD/MM/YYYY");    
}  

onFileChanged(event) {
  if(<File>event.target.files[0] != undefined) {
  this.selectedFile=<File>event.target.files[0];
  this.selectedFileName=this.selectedFile.name;
  console.log("this.selectedFile==",this.selectedFile)
  var reader=new FileReader();  
  reader.readAsDataURL(event.target.files[0]);
  reader.onload=(event)=>{
  this.logo=(<FileReader>event.target).result
  }  
}
}
  
handleFileInput(file:FileList){  
  this.selectedFile=file.item(0);
  var reader=new FileReader();
  reader.onload=(event:any) =>{
    this.logo=event.target.result;
  }
  reader.readAsDataURL(this.selectedFile);
  if(navigator.onLine) { 
    this.security.TournamentLogo(this.selectedFile).subscribe(data =>{
      this.selectedFileName=data['logo'];
    },err=>{
      this._snackBar.open('Internal Server Error', 'Image Uploading Error', {  duration: 10000  }); 
    })
    }
    else {   this._snackBar.open('No internet connection.', 'You are Offline', {  duration: 10000  });  }   
}



ngOnInit() { 

  this.event_detailServer=[];
  this.administrative_Server=[]; 
  this.selectedFileName="";
  this.Venue_Server=[]; 

  this.logo='assets/img/logo-rel.png'
  this.VenueType="1";
  this.HasConcessions="1";
  this.DetailOptionGroup="1"; 
  this.DetailisEditable=true;
  this.DetailisEditable1=true; 
  this.VenuesFirstCtrl="hello";

  var DetailonSubmitArr=JSON.parse(localStorage.getItem('DetailonSubmitArr'))
  if(DetailonSubmitArr !=null) {
  this.timeDetail= DetailonSubmitArr[0].timeDetail;  
  this.DetailStartDate=DetailonSubmitArr[0].startDate;
 this.DetailEndDate=DetailonSubmitArr[0].endDate;
  this.DetailFormGroup = this._formBuilder.group({ 
  EventNameCtrl: [DetailonSubmitArr[0].EventNameCtrl, Validators.compose([Validators.maxLength(300), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
  SportCtrl: [DetailonSubmitArr[0].SportCtrl, Validators.required],
  OptionCtrl: [DetailonSubmitArr[0].OptionCtrl, Validators.required],
  timeDetail : [this.timeDetail, Validators.required]
}); 
}
else {
  this.DetailFormGroup = this._formBuilder.group({ 
  EventNameCtrl: ["", Validators.compose([Validators.maxLength(300), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
  SportCtrl: ["", Validators.required],
  OptionCtrl: ["", Validators.required],
  timeDetail : [this.timeDetail, Validators.required]
}); 
}
var AdminonSubmitArr=JSON.parse(localStorage.getItem('AdminonSubmitArr'))
if(AdminonSubmitArr !=null){
  this.AdministrativeFormGroup = this._formBuilder.group({ 
    adminNameCtrl:[AdminonSubmitArr[0].adminNameCtrl, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    adminEmailCtrl:[AdminonSubmitArr[0].adminEmailCtrl, Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
    adminPhoneCtrl: [AdminonSubmitArr[0].adminPhoneCtrl, Validators.compose([Validators.maxLength(15)])],
    adminOrgCtrl: [AdminonSubmitArr[0].adminOrgCtrl, Validators.compose([Validators.maxLength(300), Validators.pattern('[a-zA-Z 0-9 ]*'), Validators.required])]
  }); 
}
else {
  this.AdministrativeFormGroup = this._formBuilder.group({ 
    adminNameCtrl:["", Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    adminEmailCtrl:["", Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
    adminPhoneCtrl: ["", Validators.compose([Validators.maxLength(15)])],
    adminOrgCtrl: ["", Validators.compose([Validators.maxLength(300), Validators.pattern('[a-zA-Z 0-9 ]*'), Validators.required])]
  }); 
}

this.VenuesFormGroup = this._formBuilder.group({
  VenueCtrl: ['', Validators.required]
  });
  
  this.DivisionFormGroup=this._formBuilder.group({
    DivisionCtrl:['']
    // DivisionCtrl:['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
  });
}


toggleMeridian() {
  this.meridianDetail = !this.meridianDetail;
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

onChangeVenueStart(ev,index,valueNg){ 
  console.log("valueNg==",valueNg);
}
 

timerfunVenueStart(index) {
  this.countVenueStart++
  if(this.countVenueStart%2==0) {
  ((document.getElementById("timerVenueStart_"+index) as HTMLInputElement).style.display) ="none";
  }
  else{
  ((document.getElementById("timerVenueStart_"+index) as HTMLInputElement).style.display) ="block";
  }
}

onChangeVenueEnd(ev,index){ 
  ((document.getElementById("EndHour_"+index) as HTMLInputElement).innerHTML) =ev.hour;
  ((document.getElementById("EndMin_"+index) as HTMLInputElement).innerHTML) =ev.minute;
}

timerfunVenueEnd(index) {
  this.countVenueEnd++
  if(this.countVenueEnd%2==0) {
 ((document.getElementById("timerVenueEnd_"+index) as HTMLInputElement).style.display) ="none";
  }
  else{
  ((document.getElementById("timerVenueEnd_"+index) as HTMLInputElement).style.display) ="block";
  }
}

goBack(stepper: MatStepper){
  stepper.previous();
}

goForward(stepper: MatStepper){
  stepper.next();
}

VenueonSubmit(){ 
  console.log("this.VenueFormGroup.value=",this.VenueFormGroup.value);
}

 
DetailonSubmit() {  
  var startDate = new Date(((document.getElementById("startDateDetail") as HTMLInputElement).value) ); //YYYY-MM-DD
  var endDate = new Date(((document.getElementById("endDateDetail") as HTMLInputElement).value) ); //YYYY-MM-DD
  this.VenueDateArr = this.getDateArray(startDate, endDate);  
  this.event_detailServer=[];
  var tmptimedetail=this.timeDetail.hour+":"+this.timeDetail.minute;
  this.event_detailServer.push({user_id:localStorage.getItem("userid"),event_name:this.DetailFormGroup.value.EventNameCtrl,event_type:this.DetailFormGroup.value.OptionCtrl,sport_id:this.DetailFormGroup.value.SportCtrl,start_date:this.getdateFormat1(((document.getElementById("startDateDetail") as HTMLInputElement).value)),end_date:this.getdateFormat1(((document.getElementById("endDateDetail") as HTMLInputElement).value)),time_duration:tmptimedetail });
  localStorage.setItem('VenueDateArr', JSON.stringify(this.VenueDateArr));  
  localStorage.setItem('timeDetail', JSON.stringify(this.timeDetail)); 
  var DetailonSubmitArr=[]; 
  DetailonSubmitArr.push({EventNameCtrl:this.DetailFormGroup.value.EventNameCtrl,OptionCtrl:this.DetailFormGroup.value.OptionCtrl ,SportCtrl:this.DetailFormGroup.value.SportCtrl,timeDetail:this.timeDetail,startDate:((document.getElementById("startDateDetail") as HTMLInputElement).value),endDate:((document.getElementById("endDateDetail") as HTMLInputElement).value)});
  localStorage.setItem('DetailonSubmitArr',JSON.stringify(DetailonSubmitArr));
}   

AdminonSubmit() {
  console.log("this.AdministrativeFormGroup.value=",this.AdministrativeFormGroup.value)
  this.administrative_Server=[];

  this.administrative_Server.push({email:this.AdministrativeFormGroup.value.adminEmailCtrl,administrator_name:this.AdministrativeFormGroup.value.adminNameCtrl ,organization_no:this.AdministrativeFormGroup.value.adminOrgCtrl,phone:this.AdministrativeFormGroup.value.adminPhoneCtrl,logo:this.selectedFileName });

  var AdminonSubmitArr=[]; 
  AdminonSubmitArr.push({adminEmailCtrl:this.AdministrativeFormGroup.value.adminEmailCtrl,adminNameCtrl:this.AdministrativeFormGroup.value.adminNameCtrl ,adminOrgCtrl:this.AdministrativeFormGroup.value.adminOrgCtrl,adminPhoneCtrl:this.AdministrativeFormGroup.value.adminPhoneCtrl});
  localStorage.setItem('AdminonSubmitArr',JSON.stringify(AdminonSubmitArr))
}

  
DivisiononSubmit()  {     
  if(navigator.onLine) {
  this.security.CreateTournament(this.event_detailServer,this.administrative_Server,this.Venue_Server).subscribe(data =>{
    console.log("Devision submit==",data)
    if(data["status"]=="200") { 
      localStorage.setItem("tournament_id",data['tournament_id']);
      this._snackBar.open(data['mesg'],'', {  duration: 5000  });  
      this.router.navigate(['/event-name']);   //this.router.navigate([EventNameComponent]);    
      return;    
    } else {
      this._snackBar.open('Internal Server Error', 'Error', {  duration: 10000  });   
    } 
  })
}
else {   this._snackBar.open('No internet connection.', 'You are Offline', {  duration: 10000  });  }        
}

/*
googlemap1(){
//load Places Autocomplete
this.mapsAPILoader.load().then(() => { 
this.setCurrentLocation();
this.geoCoder = new google.maps.Geocoder;
let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
types: ["address"]
});
autocomplete.addListener("place_changed", () => { 
this.ngZone.run(() => {
//get the place result
let place: google.maps.places.PlaceResult = autocomplete.getPlace();
//verify result
if (place.geometry === undefined || place.geometry === null) {
return;
}
for ( var i = 0; i < place.address_components.length; i++) {
var addressType = place.address_components[i].types[0]; 
if (this.addressComponets[addressType]) {
var val = place.address_components[i][this.addressComponets[addressType]];
this.assignEditFrmAddrFieldsVal(addressType,val);
}
}
//set latitude, longitude and zoom
this.latitude = place.geometry.location.lat();
this.longitude = place.geometry.location.lng();
this.zoom = 12;
});
});
});
}
*/

assignEditFrmAddrFieldsVal(addressType,val ) {
switch( addressType ) { 
case "administrative_area_level_1": this.VenueState=val; break;
case "locality": this.VenueCity=val; break;
case "country": this.VenueCountry=val; break; 
case "postal_code": this.VenuePostal=val; break;
case "street_number": break; 
case "route": this.VenueName=val; this.VenueAbbr=this.nameAbbrFun(val);  break; 
case "administrative_area_level_2": break;
case "sublocality_level_1": this.VenueAddress=val; break;
} 
} 

nameAbbrFun(str){
  /*
var matches = str.match(/\b(\w)/g); 
var acronym = matches.join(''); 
return acronym;
*/
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
     // splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1); 
      splitStr[i] = splitStr[i].charAt(0).toUpperCase();
  }
  // Directly return the joined string
  //return splitStr.join(' '); 
  return splitStr.join(''); 
}

// Get Current Location Coordinates
private setCurrentLocation() {
if ('geolocation' in navigator) {
navigator.geolocation.getCurrentPosition((position) => {
this.latitude = position.coords.latitude;
this.longitude = position.coords.longitude;
this.zoom = 8;
this.getAddress(this.latitude, this.longitude);
});
}
}


markerDragEnd($event: MouseEvent) {
this.latitude = $event.coords.lat;
this.longitude = $event.coords.lng;
this.getAddress(this.latitude, this.longitude);
}

getAddress(latitude, longitude) {
this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
if (status === 'OK') {
if (results[0]) {
this.zoom = 12;
this.address = results[0].formatted_address; 
} else {
window.alert('No results found');
}
} else {
window.alert('Geocoder failed due to: ' + status);
}
});
}

DynamicFormControls() { 
  return <FormArray>this.usersForm.get('users');
}

get formData() { return <FormArray>this.usersForm.get('users'); }  
 
addAddress() {
let usersArray = this.usersForm.controls.users as FormArray;
let arraylen = usersArray.length;
  let newUsergroup: FormGroup = this._formBuilder.group({
    CourtName:new FormControl('',Validators.required),
    Abbr:new FormControl()
  })
usersArray.insert(arraylen, newUsergroup);
}
 
removeAddress(i: number) {
  let usersArray = this.usersForm.controls.users as FormArray;
  usersArray.removeAt(i);
  }

CourtChanged(ev,index) {
  let usersArray = this.usersForm.controls.users as FormArray;
  var matches = ev.target.value.match(/\d+/g); 
if (matches) { 
((document.getElementById("courtabbr_"+index) as HTMLInputElement).value) = matches.join(''); 
usersArray.value[index].Abbr=matches.join('');     
}
}

AbbrChanged(ev,index){
  let usersArray = this.usersForm.controls.users as FormArray;
  usersArray.value[index].Abbr=ev;    
}

logValue() {
  console.log("VenueDateArr==",this.VenueDateArr);  
}
   
  showModal():void {
  $('#myModal').modal('show');
  }

  hideModal():void {
  document.getElementById('close-modal').click();
  this.VenuesFirstCtrl="hello"; 
  } 



openModalDialog() {
  this.VenueType="1";
  this.HasConcessions="1";
  console.log(" this.VenueType==", this.VenueType);
  this.display='block'; //Set block css
}

closeModalDialog() {
this.display='none'; //set none css after close dialog
}


openDialog() {
  const dialogRef = this.dialog.open(ForgetpasswordComponent, {
    disableClose : false,
    data: { VenueDateArr: this.VenueDateArr }
  });
  dialogRef.beforeClose().subscribe(result => {
		console.log('The dialog beforeClose');
    });
  dialogRef.afterClosed().subscribe(result => {
    console.log("Dialog result:", result);
    if(result.ModalStatus){
      this.FinalArrayVenues.push({ Venuesaddress:result.Venuesaddress,VenueCourtArray:result.VenueCourtArray,VenueDateArray:result.VenueDateArray,VenueOtherArray:result.VenueOtherArray,VenueAbbr:result.Venuesaddress.VenueAbbr,VenueAddress:result.Venuesaddress.VenueAddress,VenueCity:result.Venuesaddress.VenueCity,VenueCountry:result.Venuesaddress.VenueCountry,VenueName:result.Venuesaddress.VenueName,VenuePostal:result.Venuesaddress.VenuePostal,VenueState:result.Venuesaddress.VenueState,HasConcessions:result.VenueOtherArray.HasConcessions,VenueType:result.VenueOtherArray.VenueType })
      this.Venue_Server=result.VenueResponse;  
    }
  console.log("this.FinalArrayVenues==",this.FinalArrayVenues);  
  localStorage.setItem('FinalArrayVenue', JSON.stringify(this.FinalArrayVenues));
  });    
}


}
