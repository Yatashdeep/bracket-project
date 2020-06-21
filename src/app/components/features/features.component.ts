import { Component, OnInit } from '@angular/core';
import{SecurityServiceService}from'../../security-service.service' 

// import * as $ from 'jquery';
@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {
  title = 'Look jQuery Animation working in action!';
  tiles
  /*
 tiles=[{icon:'fa fa-gamepad',icontext:'Generate Games',heading:'Build the Tournament you Want',text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,remaining essentially unchanged.',img:'assets/img/fea-img-1.png'},
  {icon:'fa fa-clock-o',icontext:'Schedule',heading:'Spend Less Time Scheduling',text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,remaining essentially unchanged.',img:'assets/img/time-management.png'},
  {icon:'fa fa-comments-o',icontext:'Communication',heading:'Keep Parents and Fans Informed',text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,remaining essentially unchanged.',img:'assets/img/communication.png'},
  {icon:'fa fa-trophy',icontext:'In-Tournament',heading:'Deliver Results Instantly',text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,remaining essentially unchanged.',img:'assets/img/iphone.png'},
  {icon:'fa fa-file-text-o',icontext:'Online Registration',heading:'Built for your Tournament',text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,remaining essentially unchanged.',img:'assets/img/registration-2.png'}

]
*/
ImageUrl
  constructor(public security:SecurityServiceService) {
    this.tiles=[];
    this.ImageUrl="http://bracketteam.optimaltechnology.in/uploads/";

   }
  
  ngOnInit() {   
  //   $(document).ready(function(){
  //     $("button").click(function(){
  //         var div = $("div");  
  //         div.animate({left: '100px'}, "slow");
  //         div.animate({fontSize: '5em'}, "slow");
  //     });
  // });

  this.security.FeatureAPi().subscribe(data =>{  
    if(data["status"]=="200"){ 
      console.log("UpComming data ==",data);  
      this.tiles=data["custom"];   
    }
})

  }

}


 