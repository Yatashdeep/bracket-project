import { Component, OnInit } from '@angular/core';
import{MatBottomSheet,MatBottomSheetRef}from'@angular/material/bottom-sheet';

@Component({
  selector: 'app-termsandconditions',
  templateUrl: './termsandconditions.component.html',
  styleUrls: ['./termsandconditions.component.css']
})
export class TermsandconditionsComponent implements OnInit {

  constructor(private matBottomSheet:MatBottomSheet) { }

  ngOnInit() {
  }

  openlink(event:MouseEvent):void{  
    this.matBottomSheet.dismiss(); 
    event.preventDefault();
    }
      

}
