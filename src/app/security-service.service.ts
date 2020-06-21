import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ENV}from'../app/env'
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable, Observer, fromEvent, merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityServiceService {

  constructor(private httpClient: HttpClient) {

  }
   
  CheckInternetCoonection(){
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })); 
  }

  login(username,password)
  {
    
   let params= {
     "email":username,
     "password":password
     }
   return this.httpClient.post(ENV.mainApi+'user-login',params) 
   .pipe(map(data=>{
    return data
   }))
  }

  GetSportIDconfig()
  {
   return this.httpClient.get(ENV.mainApi+'config') 
   .pipe(map(data=>{
    return data
   }))
  }

  GetAllTournament(start_limit,limit) {   
    let params= {
      "start_limit":start_limit,
      "limit":limit
      }
   return this.httpClient.post(ENV.mainApi+'get-all-tournament-per-page',params) 
   .pipe(map(data=>{
    return data
   }))
  }

  GetAllTournamentBySports(sport_id,start_limit,limit) {     
    let params= { "sport_id":sport_id,
      "start_limit":start_limit,
      "limit":limit
      }
   return this.httpClient.post(ENV.mainApi+'get-all-tournament-by-sports',params) 
   .pipe(map(data=>{
    return data
   }))
  }

  signup(      Firstname,
  Lastname,
  Email,
  Password,
  organizationName)
  {
  
    let params={
     "name":Firstname,
     "lastname":Lastname,
     "email":Email,
     "password":Password,
     "company":organizationName,
     "status":0
    }
    
   return this.httpClient.post(ENV.mainApi+'user-create',params)
   .pipe(map(data=>{
    return data
   }))
  }
  forgetpassword(Email)
  {
    let params={
     
      "email":Email,
     
     }
     
    return this.httpClient.post(ENV.mainApi+'forgetpassword',params)
    .pipe(map(data=>{
     return data
    }))
  }
  changepassword(id,password)
  {
    let params={
      "id":id,
      "password":password,
     
     }
     
    return this.httpClient.post(ENV.mainApi+'updatePassword',params)
    .pipe(map(data=>{
     return data
    }))
  }
  emailverify(id)
  {
    let params={
      "id":id,
      "status":1

    }
    return this.httpClient.post(ENV.mainApi+'emailVerification',params)
    .pipe(map(data=>{
     return data 
    }))
  }
  sendemail(firstname,lastname,email,phone,organization_name)
  {
    let params={
      fname:firstname
      ,lname:lastname
      ,email:email
      ,phone:phone
      ,organization_name:organization_name 
    }
    return this.httpClient.post(ENV.mainApi+'contact-us',params)
    .pipe(map(data=>{
      return data
    }))
  }

  FeatureAPi()
  {
    let params={
    } 
    return this.httpClient.get(ENV.mainApi+'get-all-custompage-by-grid')
    .pipe(map(data=>{
      return data
    }))
  }

  CreateTournament(event_detail,administrative,venue) {  
    let params=JSON.stringify({ event_detail: { 
      user_id:event_detail[0].user_id,
      event_name:event_detail[0].event_name,
      event_type:event_detail[0].event_type,
      sport_id:event_detail[0].sport_id,
      start_date:event_detail[0].start_date,
      end_date:event_detail[0].end_date,
      time_duration:event_detail[0].time_duration
    },
      administrative: { 
        administrator_name:administrative[0].administrator_name,
        email:administrative[0].email,
        phone:administrative[0].phone.toString(),  
        organization_name:administrative[0].organization_no,  
        logo:administrative[0].logo
      },
      venue:venue, 
      tourPublishState:"1" 
    });
    return this.httpClient.post(ENV.mainApi+'tournament-save',params).pipe(map(data=>{  return data  } ));
  }

  VenueSave(venue,court,dates,venue_note,venue_type,has_concession) { 
    let params= JSON.stringify({ venue:{
      name:venue[0].name,
      abbr:venue[0].abbr,
      street_add:venue[0].street_add,
      city:venue[0].city,
      state:venue[0].state,
      postal:venue[0].postal,
      country_id:venue[0].country_id,
      user_id:venue[0].user_id
    },court:{
      name:court[0].name,
      abbr:court[0].abbr
    },dates:{
      date:dates[0].date,
      first_game_start:dates[0].first_game_start,
      list_game_start:dates[0].list_game_start,
      no_game:dates[0].no_game
    },other_details:{
      venue_note:venue_note,
      venue_type:venue_type,
      has_concession:has_concession
    } });      
    return this.httpClient.post(ENV.mainApi+'venue-save',params).pipe(map(data=>{  return data;  } ));
  }  
  
  GetUser() {    
    let params= { token:localStorage.getItem('token') }  
    return this.httpClient.post(ENV.mainApi+'get-user',params).pipe(map(data=>{  return data;  } ));
  } 
  
     
  DivisionSave(division_name,tournament_id,tie_breakers) {    
    let params= { division_name:division_name,tournament_id:tournament_id,user_id:localStorage.getItem('userid'),tie_breakers:tie_breakers }  
    return this.httpClient.post(ENV.mainApi+'division-save',params).pipe(map(data=>{  return data;  } ));
  } 

  DivisionUpdate(division_name,division_id) {    
    let params= { division_name:division_name,id:division_id }  
    return this.httpClient.post(ENV.mainApi+'division-update',params).pipe(map(data=>{  return data;  } ));
  } 

  
  TeamSave(team_name,tournament_id,division_id) {    
    let params= { name:team_name,tournament_id:tournament_id,division_id:division_id,user_id:localStorage.getItem('userid'),status:"1" }  
    return this.httpClient.post(ENV.mainApi+'team-save',params).pipe(map(data=>{  return data;  } ));
  } 

  TournamentLogo(fileToUpload) {  
    const endpoint=ENV.mainApi+'tournament-logo';
    const formData:FormData=new FormData();
    formData.append('file',fileToUpload,fileToUpload.name);
    return this.httpClient.post(endpoint,formData).pipe(map(data=>{  return data; console.log("data service==",data);  } ));   
    /*
    let params= { file:file }  
    return this.httpClient.post(ENV.mainApi+'tournament-logo',params).pipe(map(data=>{  return data;  } ));
    */
  } 
 
     
/*

API - http://bracketteam.optimaltechnology.in/api/team-save
Parameter - name, user_id, tournament_id, division_id, status
Type- POST
Response - "status": 200, "mesg": "Division Save Success", "team_list": {"team_id":10,"team_name":"name"}


API - http://bracketteam.optimaltechnology.in/api/division-update
Parameter - id, division_name
Type - POST
Return - "status": 200, "mesg": "Division Save Success", "division_list": {"division_id":10,"division_name":"name"}


  Parameter format -
  {"division_name":"name","tournament_id":"1","user_id":"1","tie_breakers":[{"name":"win percentge","status":"1"},{"name":"head to head","status":"0"}]}
  API - http://bracketteam.optimaltechnology.in/api/division-save
  Type- Post
  Return response - "status": 200, "mesg": "Division Save Success", "division_list":{"division_id":10,"division_name":"name"}
*/


}
