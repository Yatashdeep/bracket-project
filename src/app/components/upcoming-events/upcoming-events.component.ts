import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import{SecurityServiceService}from'../../security-service.service' 

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.css'] 
})
export class UpcomingEventsComponent implements OnInit {   

  baseballs= [{cardimg:'assets/img/tournament.png',heading:'Fall Showcase Athletic Testing', p1:'Midwest Sports Productions', p2:'Oct 19,         2019', p3:'USAES 18U - USAES 14U', p4:'4', p5:'Kansas City, KS'},
        {cardimg:'assets/img/tournament.png',heading:'Fall Showcase Athletic Testing', p1:'Midwest Sports Productions', p2:'Oct 19,2019', p3:'USAES 18U - USAES 14U', p4:'4', p5:'Kansas City, KS'},
        {cardimg:'assets/img/tournament.png',heading:'Fall Showcase Athletic Testing', p1:'Midwest Sports Productions', p2:'Oct 19,2019', p3:'USAES 18U - USAES 14U', p4:'4', p5:'Kansas City, KS'},
        {cardimg:'assets/img/tournament.png',heading:'Fall Showcase Athletic Testing', p1:'Midwest Sports Productions', p2:'Oct 19,2019', p3:'USAES 18U - USAES 14U', p4:'4', p5:'Kansas City, KS'},
        {cardimg:'assets/img/tournament.png',heading:'Fall Showcase Athletic Testing', p1:'Midwest Sports Productions', p2:'Oct 19,2019', p3:'USAES 18U - USAES 14U', p4:'4', p5:'Kansas City, KS'},
        {cardimg:'assets/img/tournament.png',heading:'Fall Showcase Athletic Testing', p1:'Midwest Sports Productions', p2:'Oct 19,2019', p3:'USAES 18U - USAES 14U', p4:'4', p5:'Kansas City, KS'},
        {cardimg:'assets/img/tournament.png',heading:'Fall Showcase Athletic Testing', p1:'Midwest Sports Productions', p2:'Oct 19,2019', p3:'USAES 18U - USAES 14U', p4:'4', p5:'Kansas City, KS'},
        {cardimg:'assets/img/tournament.png',heading:'Fall Showcase Athletic Testing', p1:'Midwest Sports Productions', p2:'Oct 19,2019', p3:'USAES 18U - USAES 14U', p4:'4', p5:'Kansas City, KS'},
        {cardimg:'assets/img/tournament.png',heading:'Fall Showcase Athletic Testing', p1:'Midwest Sports Productions', p2:'Oct 19,2019', p3:'USAES 18U - USAES 14U', p4:'4', p5:'Kansas City, KS'},
        {cardimg:'assets/img/tournament.png',heading:'Fall Showcase Athletic Testing', p1:'Midwest Sports Productions', p2:'Oct 19,2019', p3:'USAES 18U - USAES 14U', p4:'4', p5:'Kansas City, KS'},
        {cardimg:'assets/img/tournament.png',heading:'Fall Showcase Athletic Testing', p1:'Midwest Sports Productions', p2:'Oct 19,2019', p3:'USAES 18U - USAES 14U', p4:'4', p5:'Kansas City, KS'},
        {cardimg:'assets/img/tournament.png',heading:'Fall Showcase Athletic Testing', p1:'Midwest Sports Productions', p2:'Oct 19,2019', p3:'USAES 18U - USAES 14U', p4:'4', p5:'Kansas City, KS'},
        {cardimg:'assets/img/tournament.png',heading:'Fall Showcase Athletic Testing', p1:'Midwest Sports Productions', p2:'Oct 19,2019', p3:'USAES 18U - USAES 14U', p4:'4', p5:'Kansas City, KS'}];
  
 basketballs= [{heading:'BASKETBALL MASTER ALL DIVISIONS LEAGUE', p1:'Power2Play Sports Event Center', p2:'Oct 19,2019', p3:'4th Grade Boys T1 - 8th Grade Girls T3', p4:'13', p5:'5699 Crooked Stick Dr, Windsor, CO 80550, USA'},
 {heading:'BASKETBALL MASTER ALL DIVISIONS LEAGUE', p1:'Power2Play Sports Event Center', p2:'Oct 19,2019', p3:'4th Grade Boys T1 - 8th Grade Girls T3', p4:'13', p5:'5699 Crooked Stick Dr, Windsor, CO 80550, USA'},
 {heading:'BASKETBALL MASTER ALL DIVISIONS LEAGUE', p1:'Power2Play Sports Event Center', p2:'Oct 19,2019', p3:'4th Grade Boys T1 - 8th Grade Girls T3', p4:'13', p5:'5699 Crooked Stick Dr, Windsor, CO 80550, USA'},
 {heading:'BASKETBALL MASTER ALL DIVISIONS LEAGUE', p1:'Power2Play Sports Event Center', p2:'Oct 19,2019', p3:'4th Grade Boys T1 - 8th Grade Girls T3', p4:'13', p5:'5699 Crooked Stick Dr, Windsor, CO 80550, USA'},
 {heading:'BASKETBALL MASTER ALL DIVISIONS LEAGUE', p1:'Power2Play Sports Event Center', p2:'Oct 19,2019', p3:'4th Grade Boys T1 - 8th Grade Girls T3', p4:'13', p5:'5699 Crooked Stick Dr, Windsor, CO 80550, USA'}];    
     
 soccers= [{heading:'MSSA Football under 16 - Girls', p1:'Mumbai School Sports Association (MSSA)', p2:'Jul 15,2019', p3:'Youth 16u'},{heading:'MSSA Football under 16 - Girls', p1:'Mumbai School Sports Association (MSSA)', p2:'Jul 15,2019', p3:'Youth 16u'}
,{heading:'MSSA Football under 16 - Girls', p1:'Mumbai School Sports Association (MSSA)', p2:'Jul 15,2019', p3:'Youth 16u'},{heading:'MSSA Football under 16 - Girls', p1:'Mumbai School Sports Association (MSSA)', p2:'Jul 15,2019', p3:'Youth 16u'},
{heading:'MSSA Football under 16 - Girls', p1:'Mumbai School Sports Association (MSSA)', p2:'Jul 15,2019', p3:'Youth 16u'},{heading:'MSSA Football under 16 - Girls', p1:'Mumbai School Sports Association (MSSA)', p2:'Jul 15,2019', p3:'Youth 16u'},
{heading:'MSSA Football under 16 - Girls', p1:'Mumbai School Sports Association (MSSA)', p2:'Jul 15,2019', p3:'Youth 16u'},{heading:'MSSA Football under 16 - Girls', p1:'Mumbai School Sports Association (MSSA)', p2:'Jul 15,2019', p3:'Youth 16u'}]

softballs=[{heading:'Super 48 14B', p1:'Midwest Sports Productions', p2:'Oct 25,2019', p3:'8 Open - 18C', p4:'6', p5:'Kansas City Metro'},
  {heading:'Super 48 14B', p1:'Midwest Sports Productions', p2:'Oct 25,2019', p3:'8 Open - 18C', p4:'6', p5:'Kansas City Metro'},
  {heading:'Super 48 14B', p1:'Midwest Sports Productions', p2:'Oct 25,2019', p3:'8 Open - 18C', p4:'6', p5:'Kansas City Metro'},
  {heading:'Super 48 14B', p1:'Midwest Sports Productions', p2:'Oct 25,2019', p3:'8 Open - 18C', p4:'6', p5:'Kansas City Metro'},
  {heading:'Super 48 14B', p1:'Midwest Sports Productions', p2:'Oct 25,2019', p3:'8 Open - 18C', p4:'6', p5:'Kansas City Metro'},
  {heading:'Super 48 14B', p1:'Midwest Sports Productions', p2:'Oct 25,2019', p3:'8 Open - 18C', p4:'6', p5:'Kansas City Metro'},
  {heading:'Super 48 14B', p1:'Midwest Sports Productions', p2:'Oct 25,2019', p3:'8 Open - 18C', p4:'6', p5:'Kansas City Metro'},
  {heading:'Super 48 14B', p1:'Midwest Sports Productions', p2:'Oct 25,2019', p3:'8 Open - 18C', p4:'6', p5:'Kansas City Metro'},
  {heading:'Super 48 14B', p1:'Midwest Sports Productions', p2:'Oct 25,2019', p3:'8 Open - 18C', p4:'6', p5:'Kansas City Metro'}]
  constructor(public security:SecurityServiceService) {
    this.security.GetAllTournamentBySports(2,0,10).subscribe(data =>{ 
      if(data["status"]=="200"){ 
        console.log("UpComming data ==",data);  
        //this.tournament=data["tournament"];  
        console.log("UpComming data tournament==",data["tournament"]);  
      }
  })  
   }

  ngOnInit() {
  }

}
