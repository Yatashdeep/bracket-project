import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import{SecurityServiceService}from'../../security-service.service' 
import * as moment from 'moment'; 

@Component({
  selector: 'app-show-tournament',
  templateUrl: './show-tournament.component.html',
  styleUrls: ['./show-tournament.component.css']
})
export class ShowTournamentComponent implements OnInit {
  tournament=[];

collection=[];
@Input() id: string;
@Input() maxSize: number;
@Output() pageChange: EventEmitter<number>;

  constructor(public security:SecurityServiceService) {
    
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }

    this.tournament=[];
    this.security.GetAllTournament(0,10).subscribe(data =>{
      if(data["status"]=="200"){ 
        console.log("data==",data);  
        this.tournament=data["tournament"];
        console.log("data tournament==",data["tournament"]);  
      }
  })
   }

  ServerTimestamp(nowDate) {
    return moment(nowDate).format("MMM DD,YYYY");    //Sep 29,2019
  } 
 
  ngOnInit() {
  }

}
