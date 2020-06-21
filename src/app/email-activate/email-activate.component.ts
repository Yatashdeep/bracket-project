import { Component, OnInit } from '@angular/core';
import{SecurityServiceService}from'../security-service.service'
import { from } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-email-activate',
  templateUrl: './email-activate.component.html',
  styleUrls: ['./email-activate.component.css']
})
export class EmailActivateComponent implements OnInit {
  href
  decodeduri
  getid
  id
  constructor(public security:SecurityServiceService,private router: Router) { }

  ngOnInit() {
    this.href = this.router.url;
    
    this.decodeduri=decodeURIComponent(this.href)
    this.getid=this.decodeduri.split("EmailActivate?id=")
   
    this.id=atob(this.getid[1])
    console.log('id'+this.id)
   this.security.emailverify(this.id).subscribe(data=>{
    
   })

  }


}
