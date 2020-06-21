import { Injectable } from '@angular/core';
import{Observable,Subject}from'rxjs'
import{BehaviorSubject}from'rxjs'
@Injectable({
  providedIn: 'root'
})
export class EventnameService {
private subject=new Subject<any>();
public dataservice=new BehaviorSubject('default message');
currentmessage=this.dataservice.asObservable();
  constructor() { }
 
 changemessage(message:string)
 {
   this.dataservice.next(message)
 }  
  
 



  addtocart(product:string)
  {
     this.subject.next({name:product});
  }
   clearcart()
   {
     this.subject.next();
   }
   getcart():Observable<any>{
     return this.subject.asObservable();
   }
}
