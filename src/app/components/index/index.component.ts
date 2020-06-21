import { Component, OnInit } from '@angular/core';
import{UserserviceServiceService}from'../../userservice-service.service'
import{SecurityServiceService}from'../../security-service.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  tiles=[{text:'Automated Scheduling',icon:'assets/img/automated-scheduling.png'},
  {text:'Online Registration',icon:'assets/img/online-registration.png'},
  {text:'Real time Success App',icon:'assets/img/successapp.png'}]
  buttonstatus
  constructor(public userservice:UserserviceServiceService,public security:SecurityServiceService) { }

  ngOnInit() {  
    this.security.GetSportIDconfig().subscribe(data=>{
      console.log("data index==",data);
    })
    if(this.userservice.isLogged()==true)
    {
         this.buttonstatus=true
    }
    else
    {
      this.buttonstatus=false
    }
  }

}

