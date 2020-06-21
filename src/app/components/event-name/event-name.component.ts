import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; 
import interactionPlugin ,{Draggable} from '@fullcalendar/interaction'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import{DialogpopupComponent}from'../../dialogpopup/dialogpopup.component'
import { from } from 'rxjs';
import { Router } from '@angular/router';
import{Observable,Subject}from'rxjs'
import{EventnameService}from'../../eventname.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import{SecurityServiceService}from'../../security-service.service' 

export interface DialogData {
  divisionname: string;
}
@Component({
  selector: 'app-event-name',
  templateUrl: './event-name.component.html',
  styleUrls: ['./event-name.component.css']
})
export class EventNameComponent implements OnInit {

  disabled
  color
  checked 

  divisionname: string;
  eventname:string;
  options: any;
  eventsModel: any;
  divisionitem=['General']
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  @ViewChild('external') external: ElementRef;
  items = [{venue:'Venue',date:'30-09-2019',starttime:'10:00',endtime:'13:00'},{venue:'Venue',date:'30-10-2019',starttime:'10:00',endtime:'13:00'}]
  finalarrayvenue
  addteams
  editinput:boolean
  buttonchange:boolean
  editarrayinput=[{idteams:'Team 0'}]
  idteams=0
  eventarray=[]
  eventid
  evennamearray=[]
  eventtitle
  eventnameinput
  eventinputarray=[]
  eventinputsave
  geteventid
  eventgetid=0
  buttonactive:boolean
  headeractive:boolean
  constructor(public eventnames:EventnameService,public dialog: MatDialog,public router:Router,public security:SecurityServiceService,private _snackBar: MatSnackBar)
  {
    this.editinput=false
    this.buttonchange=true
    this.eventarray.push({divisionitem:this.divisionitem[0],inputteams:null})
    this.evennamearray.push({divisionitem:'General'})
    console.log('eventarray',this.eventarray)
    this.eventinputsave=false
    this.eventtitle='General'
    this.buttonactive=true
    this.headeractive=true

/*
    var eventArrayTmp=JSON.parse(localStorage.getItem('evennamearray'));
    console.log("eventArrayTmp=",eventArrayTmp);
    if(eventArrayTmp!=null){       
      this.evennamearray=JSON.parse(localStorage.getItem('evennamearray'));
    }
    */
    console.log('event 2',this.evennamearray);
  
  }
  addteamsfunc()
  {
     
    this.eventinputsave=true
    this.idteams++
    this.eventinputarray.push({inputid:this.idteams})
    console.log(this.eventinputarray)
    for(var i=0;i<this.evennamearray.length;i++)
    {
     if(this.evennamearray[i].divisionitem==this.eventtitle)
     {
       this.geteventid=i
       this.evennamearray[i].eventinputarray=this.eventinputarray
         
    
     }
     }
    console.log(this.evennamearray)
    // this.idteams++
    // this.editarrayinput.push({idteams:'Team '+this.idteams}) 
    // for(var i=0;i<this.eventarray.length;i++)
    // {
    //  if(this.eventid==i)
    //  {
    //   console.log('eventid'+this.eventid)
    //    this.eventarray[this.eventid].inputteams=this.editarrayinput
    //    console.log('eventarray',this.eventarray)
    //  }
    // }
    // for(var i=0;i<this.eventarray.length;i++)
    // {
    //  if(this.eventid==i)
    //  {
    //   this.idteams++
    //   this.editarrayinput.push({idteams:'Team '+this.idteams}) 
    //    this.eventarray[this.eventid].inputteams=this.editarrayinput
      
    //   console.log('eventarray',this.eventarray)
    //  }
    // }
   
    // console.log('array',this.editarrayinput)
    
    
  }

  save() {
   this.eventinputsave=false
   this.buttonactive=false
   this.buttonchange=true
    console.log('save==',this.geteventid) 
    this.eventinputarray=this.evennamearray[this.geteventid].eventinputarray
   console.log("1==",this.evennamearray) 
   if(this.evennamearray[this.geteventid].eventinputarray==0) {
    this.editinput=false
    this.addteams=false
   }
    else {
      this.addteams=true
    } 

    if(navigator.onLine) { 
      this.security.TeamSave(this.evennamearray[this.geteventid].eventinputarray,localStorage.getItem("tournament_id"),this.evennamearray[this.geteventid].divisionitem).subscribe(data =>{
        if(data["status"]=="200") { 
          this._snackBar.open(data['mesg'],'', {  duration: 5000  }); 
          localStorage.setItem('evennamearray', JSON.stringify(this.evennamearray));  
          console.log("evennamearray==",JSON.parse(localStorage.getItem('evennamearray')));    
          return;    
        } else {
          this._snackBar.open('Internal Server Error', 'Error', {  duration: 10000  });   
        } 
      })
    }
    else {   this._snackBar.open('No internet connection.', 'You are Offline', {  duration: 10000  });  }   
  }

  editteams()
  {
    this.buttonchange=false
    this.editinput=true
    this.buttonactive=true
    this.eventinputsave=true
    console.log(this.eventinputarray.length)
    if(this.eventinputarray.length==0)
    {
    this.idteams++
    this.eventinputarray.push({inputid:this.idteams})
    console.log(this.eventinputarray)
    for(var i=0;i<this.evennamearray.length;i++)
    {
     if(this.evennamearray[i].divisionitem==this.eventtitle)
     {
       this.geteventid=i
       this.evennamearray[i].eventinputarray=this.eventinputarray
     }
     }
    }
    console.log(this.evennamearray) 
  }

  navigatetobracket()
  {
    this.eventnames.changemessage(JSON.stringify(this.evennamearray[0].eventinputarray))
    // this.eventnames.addtocart('product')
        //  this.subject.next({eventname:this.evennamearray})
    this.router.navigate(['/create-new-bracket'])
  }
 


  delete(j,val)
  {
   
 
             
             this.evennamearray[this.eventgetid].eventinputarray.splice(j,1)
           if(this.evennamearray[this.eventgetid].eventinputarray==0)
           {
            this.headeractive=false
           }
 
   
  }

  chooseevent(eventname,i) {
    this.eventgetid=i
   console.log('eventname'+eventname)  
   this.eventtitle=eventname
   this.eventinputsave=false
   this.eventinputarray=[] 
   console.log('ismein kya hai=',this.evennamearray[i].eventinputarray)
    
   document.getElementById('x_'+i).style.backgroundColor='#f8f9fa!important;'
   
   if(this.evennamearray[i].eventinputarray)
   {
   this.eventinputarray=this.evennamearray[i].eventinputarray
   
   this.editinput=true
   this.addteams=true
   }
   else
   {
    this.editinput=false
    this.addteams=false
   }
  }

  newdivision()
  {
    console.log('division')
   const dialogRef=this.dialog.open(DialogpopupComponent, { 
      width:'350px', 
      height:'250px', 
      data:{ divisionname:this.divisionname } 
   })
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed==',result); 
    if(result != undefined) {
      if(navigator.onLine) { 
      var tie_breakers=[];
      this.security.DivisionSave(result,localStorage.getItem("tournament_id"),tie_breakers).subscribe(data =>{
        if(data["status"]=="200") { 
          this._snackBar.open(data['mesg'],'', {  duration: 5000  }); 
          this.evennamearray.push({divisionitem:result,eventinputarray:null})    
          return;    
        } else {
          this._snackBar.open('Internal Server Error', 'Error', {  duration: 10000  });   
        } 
      })
    }
    else {   this._snackBar.open('No internet connection.', 'You are Offline', {  duration: 10000  });  }    
    }
    // this.eventarray.push({divisionitem:result,inputteams:null})
    // console.log('eventarray',this.eventarray)
    // this.divisionitem.push(result)
  });
  }
  ngOnInit() {
    this.eventname='General'
    this.addteams=false
    this.finalarrayvenue=JSON.parse(localStorage.getItem('FinalArrayVenue'))
    console.log('finalarrayvenue',JSON.parse(localStorage.getItem('FinalArrayVenue')))
    // Don't use FullcalendarOption interface
    this.options = {
      editable: true,
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: function () {
            alert('clicked the custom button!');
          }
        }
      },
      theme: 'standard', // default view, may be bootstrap
      header: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
        // right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      eventDrop: function(event,dayDelta,minuteDelta,allDay,revertFunc) {

        alert(
            event.title + " was moved " +
            dayDelta + " days and " +
            minuteDelta + " minutes."
        );

        if (allDay) {
            alert("Event is now all-day");
        }else{
            alert("Event has a time-of-day");
        }

        if (!confirm("Are you sure about this change?")) {
            revertFunc();
        }

    },
      // defaultDate: '2019-10-12',
    // businessHours: true, // display business hours
    
    // events: [
    //   {
    //     title: 'Business Lunch',
    //     start: '2019-10-03T13:00:00',
    //     constraint: 'businessHours'
    //   },
    //   {
    //     title: 'Meeting',
    //     start: '2019-10-13T11:00:00',
    //     constraint: 'availableForMeeting', // defined below
    //     color: '#257e4a'
    //   },
    //   {
    //     title: 'Conference',
    //     start: '2019-10-18',
    //     end: '2019-10-20'
    //   },
    //   {
    //     title: 'Party',
    //     start: '2019-10-29T20:00:00'
    //   },

    //   // areas where "Meeting" must be dropped
    //   {
    //     groupId: 'availableForMeeting',
    //     start: '2019-10-11T10:00:00',
    //     end: '2019-10-11T16:00:00',
    //     rendering: 'background'
    //   },
    //   {
    //     groupId: 'availableForMeeting',
    //     start: '2019-10-13T10:00:00',
    //     end: '2019-10-13T16:00:00',
    //     rendering: 'background'
    //   },

    //   // red areas where no events can be dropped
    //   {
    //     start: '2019-10-24',
    //     end: '2019-10-28',
    //     overlap: false,
    //     rendering: 'background',
    //     color: '#ff9f89'
    //   },
    //   {
    //     start: '2019-10-06',
    //     end: '2019-10-08',
    //     overlap: false,
    //     rendering: 'background',
    //     color: '#ff9f89'
    //   }],
      // columnHeaderHtml: () => {
      //     return '<b>Friday!</b>';
      // },
      // add other plugins
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, resourceTimeGridPlugin]
    };
    
    new Draggable(this.external.nativeElement, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        console.log(eventEl)
        return {
          title: eventEl.innerText
        };
      }
  });
  }
  
  selectitem(itemname,i)
  {
    console.log('get id',i)
    this.eventid=i
    this.eventname=itemname
   console.log('name',itemname)
  }
  eventClick(model) {
    console.log(model);
  }
  eventDragStop(model) {
    console.log('sdsds'+model);
  }
  dateClick(model) {
    console.log(model);
  }
  updateHeader() {
    this.options.header = {
      left: 'prev,next myCustomButton',
      center: 'title',
      right: ''
    };
  }
  // updateEvents() {
  //   this.eventsModel = [{
  //     title: 'Updaten Event',
  //     start: this.yearMonth + '-08',
  //     end: this.yearMonth + '-10'
  //   }];
  // }
  // get yearMonth(): string {
  //   const dateObj = new Date();
  //   return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  // }
  dayRender(ev){
    ev.el.addEventListener('dblclick', () => {
       alert('double click!');
    });
  }

 
 
}
