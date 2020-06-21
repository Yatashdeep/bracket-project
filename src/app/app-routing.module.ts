import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from'../app/homepage/homepage.component';
import { FeaturesComponent } from'../app/components/features/features.component';
import { LoginComponent } from '../app/components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CreateTournamentComponent } from './components/create-tournament/create-tournament.component';
import { DemoComponent } from './components/demo/demo.component';
import { EventNameComponent } from './components/event-name/event-name.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { UpcomingEventsComponent } from './components/upcoming-events/upcoming-events.component';
import { CreateNewBracketComponent } from './components/create-new-bracket/create-new-bracket.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { ShowTournamentComponent } from './components/show-tournament/show-tournament.component';

import { TermsandconditionComponent } from './termsandcondition/termsandcondition.component';
import { TermsandconditionsComponent } from './components/termsandconditions/termsandconditions.component';  

import{EmailActivateComponent}from'./email-activate/email-activate.component'
import { from } from 'rxjs';
import{PricingComponent}from'./pricing/pricing.component'
import{SchdeulebookingComponent}from'./schdeulebooking/schdeulebooking.component'
import { IndexComponent } from './components/index/index.component';



const routes: Routes = [
   {
    path: '',
    pathMatch: 'full',
    redirectTo: 'Home'
   },
   {
     path:'Home',
     component:HomepageComponent,
     children: [
       {path:'', component:IndexComponent},
     { path:'show-tournament',
      component:ShowTournamentComponent
     },
     { path:'create-tournament',
     component:CreateTournamentComponent
    }
     ]
     
     
   },
   {
    path:'termspopup',
    component:TermsandconditionsComponent,
    
    
  },  
   {
      path:'features',
     component:FeaturesComponent 
   },
   {
    path:'login',
   component:LoginComponent
 },
 {
  path:'signup',
 component:SignupComponent
},
{
  path:'create-tournament',
  component:CreateTournamentComponent,
  
},
{
  path:'demo',
  component:DemoComponent
},
{
  path:'event-name',
  component:EventNameComponent
},
{
  path:'forgetpassword',
  component:ForgetpasswordComponent
},
{
  path:'upcoming-events',
  component:UpcomingEventsComponent
},
{
  path:'create-new-bracket',
  component:CreateNewBracketComponent
},
{
  path:'changepassword',
  component:ChangepasswordComponent
},
{
  path:'show-tournament',
  component:ShowTournamentComponent,
  children: [

  { path:'create-tournament',
   component:CreateTournamentComponent
  }
  ]
},
{
  path:'EmailActivate',
  component:EmailActivateComponent

}
,
{
  path:'terms',
  component:TermsandconditionComponent
},
{
  path:'pricing',
  component:PricingComponent
},
{
  path:'booking',
  component:SchdeulebookingComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
