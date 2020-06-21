import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';

 // This lets me use jquery
 declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 // hide = true;
 // constructor(private _bottomSheet: MatBottomSheet) { }
 collection=[];
 @Input() id: string;
@Input() maxSize: number;
@Output() pageChange: EventEmitter<number>;

  ngOnInit() {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    } 
  }

  openBottomSheet(): void {  
   // this._bottomSheet.open(ForgetpasswordComponent);
  }

/*
 showModal():void {
        $("#myModal").modal('show');
      }
      sendModal(): void {
        //do something here
        this.hideModal();
      }
      hideModal():void {
        document.getElementById('close-modal').click();
      }
*/

}
