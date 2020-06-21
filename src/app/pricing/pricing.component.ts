import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  cards=[{card_title:'Do it yourself',card_price:'$1.50 ',card_content:'and you create your tournament using our software solution. Limited support is available with this option. (please create a placeholder for this)'},
  {card_title:'We do it',card_price:'$5.00 ',card_content:'You provide us with your teams, venues, time slots, coaching requests, etc. and sit back while we create your schedule. (please create a placeholder for this)'},
  {card_title:'Enterprise ',card_price:'Contact us',card_content:'at info@bracketteam.com. This is designed for large or multiple tournaments where we customize your pricing. (please create a placeholder for this)'}]
  constructor() { }

  ngOnInit() {
  }

}
