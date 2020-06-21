import { Component, OnInit , NgZone, ElementRef, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormControl, FormArray} from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateTournamentComponent } from '../create-tournament/create-tournament.component';
import { Inject, Input } from '@angular/core';
import { DEFAULT_TEMPLATE } from 'ngx-pagination/dist/template';
import{SecurityServiceService}from'../../security-service.service' 
import {MatSnackBar} from '@angular/material/snack-bar';

// This lets me use jquery
declare var $: any;

export interface DialogData {
  animal: string;
  name: string;
}

@Component({ 
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
 
  Address_Server=[];
  Court_Server=[];
  dates_Server=[];
  other_details_Server=[];
  VenueResponse=[];
  
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


date = new FormControl(new Date());   
serializedDate = new FormControl((new Date()).toISOString());
tiles=[{categories:'Basketball',countries:'USA'},{categories:'Softball',countries:'UK'},{categories:'Hockey',countries:'Canada'},{categories:'Soccer'},{categories:'Baseball'}];
radios = [{venueid:"N/A",venue:'I do not know',concessionsid:"N/A",concessions:'I do not know'},{venueid:"Indoors",venue:'Indoors',concessionsid:"Yes",concessions:'Yes'},{venueid:"Outdoors",venue:'Outdoors',concessionsid:"No",concessions:'No'}]   
 emailRegex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";

 VenueAddArray=[];
 VenueCourtArray=[];
 VenueDateArray=[];
 VenueOtherArray=[]; 

  constructor(private _snackBar: MatSnackBar,public security:SecurityServiceService,private _formBuilder: FormBuilder, private mapsAPILoader: MapsAPILoader,private ngZone: NgZone,public router: Router, public dialogRef: MatDialogRef<CreateTournamentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.Address_Server=[];
      this.Court_Server=[];
      this.dates_Server=[];
   this.VenueDateArr=this.data.VenueDateArr;
      console.log("this.data.name==",this.data.VenueDateArr) 
  }

  getDateArray(start, end) {
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
        arr.push({dateval:this.getdateFormat(new Date(dt)),timeVenueStart:this.timeVenueStart,timeVenueEnd:this.timeVenueEnd});
        dt.setDate(dt.getDate() + 1);
    }
    console.log("arr===",arr);
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
  
  ngOnInit() {    

    this.VenueType="N/A";
    this.HasConcessions="N/A";
    this.DetailOptionGroup="1"; 
    this.DetailisEditable=true;
    this.DetailisEditable1=true; 
    this.VenuesFirstCtrl="hello";
 
    this.usersForm = this._formBuilder.group({
      date: this._formBuilder.control(new Date()),
      users: this._formBuilder.array([
        this._formBuilder.group({
          CourtName: ['', Validators.required],
          Abbr:new FormControl()
        })
      ])
    })

  this.VenueFormGroup = this._formBuilder.group({
  VenueName: ['', Validators.required],
  VenueAbbr: ['', Validators.required],
  VenueAddress: ['', Validators.required],
  VenueCity: ['', Validators.required],
  VenueState: ['', Validators.required],
  VenuePostal: ['', Validators.required],
  VenueCountry: ['', Validators.required],
  }); 
    /*
  this.DetailFormGroup = this._formBuilder.group({ 
    EventNameCtrl: ['', Validators.compose([Validators.maxLength(300), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    SportCtrl: ['', Validators.required],
    OptionCtrl: ['', Validators.required],
    timeDetail : [this.timeDetail, Validators.required]
  }); 
  
  this.AdministrativeFormGroup = this._formBuilder.group({
    adminNameCtrl:['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    adminEmailCtrl:['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
    adminPhoneCtrl: [null, Validators.compose([Validators.maxLength(15)])],
    adminOrgCtrl: ['', Validators.compose([Validators.maxLength(300), Validators.pattern('[a-zA-Z 0-9 ]*'), Validators.required])]
  }); 
  
  this.VenuesFormGroup = this._formBuilder.group({
    VenueCtrl: ['', Validators.required]
    });

      
  this.DivisionFormGroup=this._formBuilder.group({
    DivisionCtrl:['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
  });

  */
      this.VenueDateFormGroup = this._formBuilder.group({
        timeVenueStart : new FormControl(),
        timeVenueEnd : new FormControl(), 
        ToggleSlide:new FormControl(),
        dateval: new FormControl()    
      });
  
      this.otherFormGroup = this._formBuilder.group({ 
        VenueNotes: ['', Validators.required] ,
        VenueType: ['N/A', Validators.required],
        HasConcessions: ['N/A', Validators.required]
        });

  
  this.googlemap1();
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
    //console.log("valueNg==",valueNg);
    //((document.getElementById("StartHour_"+index) as HTMLInputElement).innerHTML) =ev.hour;
    //((document.getElementById("StartMin_"+index) as HTMLInputElement).innerHTML) =ev.minute;
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
   // ((document.getElementById("EndHour_"+index) as HTMLInputElement).innerHTML) =ev.hour;
   // ((document.getElementById("EndMin_"+index) as HTMLInputElement).innerHTML) =ev.minute;
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
    this.VenueAddArray=this.VenueFormGroup.value;
    this.Address_Server=[];
    this.Address_Server.push({name:this.VenueFormGroup.value.VenueName,abbr:this.VenueFormGroup.value.VenueAbbr,street_add:this.VenueFormGroup.value.VenueAddress,city:this.VenueFormGroup.value.VenueCity,state:this.VenueFormGroup.value.VenueState,postal:this.VenueFormGroup.value.VenuePostal,country_id:this.VenueFormGroup.value.VenueCountry,user_id:localStorage.getItem("userid")});
    console.log("this.VenueFormGroup.value=",this.VenueFormGroup.value); 
    console.log("this.VenueFormGroup.value.length==",this.VenueFormGroup.value.length);  


  }

  /*
  DetailonSubmit(){  
    var startDate = new Date(((document.getElementById("startDateDetail") as HTMLInputElement).value) ); //YYYY-MM-DD
    var endDate = new Date(((document.getElementById("endDateDetail") as HTMLInputElement).value) ); //YYYY-MM-DD
    this.VenueDateArr = this.getDateArray(startDate, endDate);

    console.log("this.DetailFormGroup.value=",this.DetailFormGroup.value)
    console.log("startDate=",((document.getElementById("startDateDetail") as HTMLInputElement).value))
    console.log("EndDate==",((document.getElementById("endDateDetail") as HTMLInputElement).value))
    console.log("VenueDateArr==",this.VenueDateArr);  
  }
  
  AdminonSubmit(){
    console.log("this.AdministrativeFormGroup.value=",this.AdministrativeFormGroup.value)
    console.log("this.AdministrativeFormGroup=",this.AdministrativeFormGroup)
  }
  */
  
  VenueDateSubmit(){
    console.log("VenueDateArr==",this.VenueDateArr);  
    console.log("VenueDateFormGroup==",this.VenueDateFormGroup);
    this.VenueDateArray=this.VenueDateFormGroup.value;
    var dateTmp=[];
    var first_game_startTmp=[];
    var list_game_startTmp=[];
    var no_gameTmp=[];
for(let i=0;i<this.VenueDateArr.length;i++) {
dateTmp.push(this.VenueDateArr[i].dateval);
first_game_startTmp.push(this.VenueDateArr[i].timeVenueStart.hour+":"+this.VenueDateArr[i].timeVenueStart.minute);
list_game_startTmp.push(this.VenueDateArr[i].timeVenueEnd.hour+":"+this.VenueDateArr[i].timeVenueEnd.minute);
if(this.VenueDateArr[i].ToggleSlide==false) { no_gameTmp.push("0"); }
if(this.VenueDateArr[i].ToggleSlide==true)  { no_gameTmp.push("1"); }
}
    this.dates_Server=[];
    this.dates_Server.push({date:dateTmp,first_game_start:first_game_startTmp,list_game_start:list_game_startTmp,no_game:no_gameTmp})
    console.log("timeDetail==",this.timeDetail);  
  }
 
  OtherSubmit() {
    this.VenuesFirstCtrl="hello";  
    this.VenueOtherArray=this.otherFormGroup.value;
    console.log(" otherFormGroup==", this.otherFormGroup);  
    this.other_details_Server=[]; 
    this.other_details_Server.push([{"venue_note":this.otherFormGroup.value.VenueNotes,"venue_type":this.otherFormGroup.value.VenueType,"has_concession":this.otherFormGroup.value.HasConcessions}]); 
    if(navigator.onLine){
    this.security.VenueSave(this.Address_Server,this.Court_Server,this.dates_Server,this.otherFormGroup.value.VenueNotes,this.otherFormGroup.value.VenueType,this.otherFormGroup.value.HasConcessions).subscribe(data =>{ 
      if(data["status"]=="200") {  
        this.VenueResponse.push(data["venue_id"]);
      }
    })
    this.closeModalDialog(true);
    }
    else {  
      this._snackBar.open('No internet connection.', 'You are Offline', {  duration: 10000  });   
    }
  }
  
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
    let usersArray = this.usersForm.controls.users as FormArray;
        console.log("usersArray==",usersArray); 
        this.VenueCourtArray=usersArray.value;
        this.Court_Server=[];
        var TmpCourtName=[];
        var TmpCourtAbbr=[];
        for(let i=0;i<usersArray.value.length;i++) {
          TmpCourtName.push(usersArray.value[i].CourtName);
          TmpCourtAbbr.push(usersArray.value[i].Abbr);
          console.log("usersArray[i].CourtName==",usersArray.value[i].CourtName);
          console.log("usersArray[i].Abbr==",usersArray.value[i].Abbr);     
        }
        this.Court_Server.push({name:TmpCourtName,abbr:TmpCourtAbbr})  
        console.log("this.Court_Server==",this.Court_Server);      
  }
  
    showModal():void {
    $('#myModal').modal('show');
    }
  
    hideModal():void {
    document.getElementById('close-modal').click();
    this.VenuesFirstCtrl="hello"; 
    } 
  
  
  
  openModalDialog() {
    this.VenueType="N/A";
    this.HasConcessions="N/A";
    console.log(" this.VenueType==", this.VenueType);
    this.display='block'; //Set block css
  }
  
   
  closeModalDialog(ModalStatus) {  
    console.log(this.dialogRef.disableClose); // Returns false  
    let usersArray = this.usersForm.controls.users as FormArray;  
    this.dialogRef.close({ Venuesaddress:this.VenueAddArray, VenueCourtArray: this.VenueCourtArray,VenueDateArr:this.VenueDateArr,VenueDateArray:this.VenueDateArray,VenueOtherArray:this.VenueOtherArray,ModalStatus:ModalStatus,VenueResponse:this.VenueResponse }); // does not close the dialog
  }
  

  


 

}


