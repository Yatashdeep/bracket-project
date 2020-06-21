import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule} from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomepageComponent } from './homepage/homepage.component';
import { ToolbarpageComponent } from './components/toolbarpage/toolbarpage.component';
import { IndexComponent } from './components/index/index.component';
import { MatCardModule} from '@angular/material/card';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule} from '@angular/material/icon';
import { FeaturesComponent } from './components/features/features.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { CreateTournamentComponent } from './components/create-tournament/create-tournament.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { DemoComponent } from './components/demo/demo.component';
import { EventNameComponent } from './components/event-name/event-name.component';
import { HttpClientModule} from '@angular/common/http';
import { MatTabsModule} from '@angular/material/tabs';
import { MatDividerModule} from '@angular/material/divider';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AgmCoreModule } from '@agm/core';
import { UpcomingEventsComponent } from './components/upcoming-events/upcoming-events.component';
import {MatBadgeModule} from '@angular/material/badge';
import { CreateNewBracketComponent } from './components/create-new-bracket/create-new-bracket.component';
//import{MatBottomSheet,MatBottomSheetRef,MatBottomSheetModule}from'@angular/material/bottom-sheet';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import{NgbModule} from'@ng-bootstrap/ng-bootstrap';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { ShowTournamentComponent } from './components/show-tournament/show-tournament.component'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TermsandconditionComponent } from './termsandcondition/termsandcondition.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatBottomSheet, MatBottomSheetRef,MatBottomSheetModule} from '@angular/material/bottom-sheet'; 
import {MatListModule} from '@angular/material/list';
import { EmailActivateComponent } from './email-activate/email-activate.component';
import { LogindialogComponent } from './logindialog/logindialog.component';

import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { MatDialogModule} from '@angular/material';
import { from } from 'rxjs';
import { DialogpopupComponent } from './dialogpopup/dialogpopup.component';
import { TermsandconditionsComponent } from './components/termsandconditions/termsandconditions.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BracketsampleComponent } from './bracketsample/bracketsample.component';
import{EventnameService}from'./eventname.service';
import { PricingComponent } from './pricing/pricing.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { SchdeulebookingComponent } from './schdeulebooking/schdeulebooking.component'

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ToolbarpageComponent,
    IndexComponent,
    FeaturesComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ForgetpasswordComponent,
    CreateTournamentComponent,
    DemoComponent,
    EventNameComponent,
    UpcomingEventsComponent,
    CreateNewBracketComponent,
    ChangepasswordComponent,
    ShowTournamentComponent,
   
    TermsandconditionComponent,
   
    EmailActivateComponent,
   
    LogindialogComponent,
   
    DialogpopupComponent,
   
    TermsandconditionsComponent,
   
    BracketsampleComponent,
   
    PricingComponent,
   
    ScrollTopComponent,
   
    SchdeulebookingComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // MatBottomSheet,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    // MatBottomSheetModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTableModule,
    HttpClientModule,
    MatTabsModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    NgxMaterialTimepickerModule,
    FullCalendarModule, 
    NgxPaginationModule, 
    MatDialogModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCnahpwY4LRTYlzEHnER3B_Y8NR1HzmrVE",
      libraries: ["places"]
  }),
  MatBadgeModule,
  // MatBottomSheetRef
  MatSidenavModule,


  MatBottomSheetModule
  ],
  entryComponents:[TermsandconditionComponent,LogindialogComponent,DialogpopupComponent],
  providers: [EventnameService,EventNameComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
