import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; 
import interactionPlugin ,{Draggable} from '@fullcalendar/interaction'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
@Component({
  selector: 'app-schdeulebooking',
  templateUrl: './schdeulebooking.component.html',
  styleUrls: ['./schdeulebooking.component.css']
})
export class SchdeulebookingComponent implements OnInit {
  options: any;
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  @ViewChild('external') external: ElementRef;
  calendarEvents = []
  constructor() { 
   this.calendarEvents.push({ title: 'event 1', date: '2019-10-10' })
  }

  ngOnInit() {
  
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
      // visibleRange: {
      //   start: '2020-03-22',
      //   end: '2020-03-25'
      // },
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
          defaultDate: '2019-10-12',
    businessHours: true, // display business hours
    
    events: [
      {
        title: 'Business Lunch',
        start: '2019-10-03T13:00:00',
        constraint: 'businessHours'
      },
      {
        title: 'Meeting',
        start: '2019-10-13T11:00:00',
        constraint: 'availableForMeeting', // defined below
        color: '#257e4a'
      },
      {
        title: 'Conference',
        start: '2019-10-18',
        end: '2019-10-20'
      },
      {
        title: 'Party',
        start: '2019-10-29T20:00:00'
      },

      // areas where "Meeting" must be dropped
      {
        groupId: 'availableForMeeting',
        start: '2019-10-11T10:00:00',
        end: '2019-10-11T16:00:00',
        rendering: 'background'
      },
      {
        groupId: 'availableForMeeting',
        start: '2019-10-13T10:00:00',
        end: '2019-10-13T16:00:00',
        rendering: 'background'
      },

      // red areas where no events can be dropped
      {
        start: '2019-10-24',
        end: '2019-10-28',
        overlap: false,
        rendering: 'background',
        color: '#ff9f89'
      },
      {
        start: '2019-10-06',
        end: '2019-10-08',
        overlap: false,
        rendering: 'background',
        color: '#ff9f89'
      }],
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

}
