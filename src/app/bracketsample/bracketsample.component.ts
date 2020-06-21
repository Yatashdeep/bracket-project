import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import{BracketstatusService}from'../bracketstatus.service'
@Component({
  selector: 'app-bracketsample',
  templateUrl: './bracketsample.component.html',
  styleUrls: ['./bracketsample.component.css']
})
export class BracketsampleComponent implements OnInit {
 
  
  
  @Input ('parentValue') parentValue
  @Input('bracketType') bracketType
  @Input('matchup') matchup
  @Output() teamsstatus =new EventEmitter(); 

  bracket_id
  single_two:boolean
  
  type
  teamnumber

  s_t_m1
  s_t_m2
  s_t_m3
  s_t_m4
  s_t_m5
  s_t_m6
  s_t_m7
  s_t_m8

  bracketstatus
  message:string;
  constructor(public bracketservice:BracketstatusService) { }   
  
    ngOnInit() {
      this.bracketstatus=true
      // this.s_t_m1=false
      // this.bracket_id=1
      // this.bracketservice.currentMessage.subscribe(message =>{ 
      //   this.message = message
      // //  alert('bracket'+this.message)
      // })
    }
   
    ngOnChanges()
    {
       

      console.log('brackettype',this.bracketType)
      console.log(this.parentValue)
      console.log(this.matchup)
      this.teamnumber=this.parentValue
       




      if(this.bracketType=='option1')
      {
         this.type='Single'  
      } 
      else if(this.bracketType=='option2')
      {
        this.type='Double'
      } 
      else if(this.bracketType=='option3')
      {
        this.type='3 game gurantee'
      } 
      else if(this.bracketType=='option4')
      {
        this.type='4 game gurantee'
      } 
      
      else if(this.bracketType=='option5')
      {
        this.type='Consolation'
      } 
      if(this.bracketType=='option1'&& this.parentValue==2)
      {
        this.bracket_id=1
        console.log(this.bracket_id)

           if(this.matchup==1)
           {   
             this.s_t_m1=true     
             this.bracketservice.changeMessage("deactive"); 
            // document.getElementById('stm1').style.backgroundColor='#28a745'
           }  
      }
      else if(this.bracketType=='option1'&& this.parentValue==4)
      {
        this.bracket_id=2
        if(this.matchup==1)
        { 
         this.s_t_m1=true
          this.s_t_m2=false
          this.bracketservice.changeMessage("deactive")
        }  
        else if(this.matchup==2)
        {
          this.s_t_m2=true
          this.s_t_m1=false
          this.bracketservice.changeMessage("deactive") 
        }
      }
      else if(this.bracketType=='option1'&& this.parentValue==5)
      {

        this.bracket_id=3
        if(this.matchup==1)
        {
            this.s_t_m1=true
            this.s_t_m2=false
            this.s_t_m3=false
            this.bracketservice.changeMessage("active")
        }
        else if(this.matchup==2)
        {
             this.s_t_m1=false
             this.s_t_m2=true
             this.s_t_m3=false
             this.bracketservice.changeMessage("deactive")
             
        }
        else if(this.matchup==3)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=true
              this.bracketservice.changeMessage("deactive")
        }

       




      }
      else if(this.bracketType=='option1'&& this.parentValue==6)
      {
        this.bracket_id=4
        if(this.matchup==1)
        {
            this.s_t_m1=true
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.bracketservice.changeMessage("active")
        }
        else if(this.matchup==2)
        {
             this.s_t_m1=false
             this.s_t_m2=true
             this.s_t_m3=false
             this.s_t_m4=false
             this.bracketservice.changeMessage("deactive") 
        }
        else if(this.matchup==3)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=true
              this.s_t_m4=false
              this.bracketservice.changeMessage("deactive")
        }
        else if(this.matchup==4)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=false
              this.s_t_m4=true
              this.bracketservice.changeMessage("active")
        }

      }
      else if(this.bracketType=='option1'&& this.parentValue==7)
      {
        this.bracket_id=5
        this.bracketactivefour(this.matchup);
        if(this.matchup==1){ this.bracketservice.changeMessage("active"); }
        else { this.bracketservice.changeMessage("deactive"); }
      }
      else if(this.bracketType=='option1'&& this.parentValue==8)
      {
        this.bracket_id=6
        this.bracketactivefour(this.matchup);
        this.bracketservice.changeMessage("deactive"); 
      }
     
      else if(this.bracketType=='option1'&& this.parentValue==9)
      {
        this.bracket_id=7
        this.bracketactivefive(this.matchup); 
        if(this.matchup==1){ this.bracketservice.changeMessage("active"); }
        else { this.bracketservice.changeMessage("deactive"); }
      }
      else if(this.bracketType=='option1'&& this.parentValue==10)
      {
        this.bracket_id=8
        this.bracketactiveSix(this.matchup)
        if(this.matchup==1 || this.matchup==4){ this.bracketservice.changeMessage("active"); }
        else { this.bracketservice.changeMessage("deactive"); }
      }
      else if(this.bracketType=='option1'&& this.parentValue==11)
      {
        this.bracket_id=9
        this.bracketactiveSeven(this.matchup)
        if(this.matchup==1 || this.matchup==4 || this.matchup==7){ this.bracketservice.changeMessage("active"); }
        else { this.bracketservice.changeMessage("deactive"); }
      }
      else if(this.bracketType=='option1'&& this.parentValue==12)
      {
        this.bracket_id=10
        this.bracketactiveEight(this.matchup)
        if(this.matchup==1 || this.matchup==4 || this.matchup==5 || this.matchup==8){ this.bracketservice.changeMessage("active"); }
        else { this.bracketservice.changeMessage("deactive"); }

      }
      else if(this.bracketType=='option1'&& this.parentValue==13)
      {
        this.bracket_id=11
        this.bracketactiveSeven(this.matchup);  
        if(this.matchup==1 || this.matchup==5 || this.matchup==8){ this.bracketservice.changeMessage("active"); }
        else { this.bracketservice.changeMessage("deactive"); }
      }
      else if(this.bracketType=='option1'&& this.parentValue==16)
      {
        this.bracket_id=12
        this.bracketactiveEight(this.matchup);
        this.bracketservice.changeMessage("deactive"); 
      }
  
  
      else if(this.bracketType=='option2'&& this.parentValue==4) {
        this.bracket_id=13
        console.log(this.bracket_id)
           if(this.matchup==1)  { 
            this.s_t_m1=true
             this.s_t_m2=false
             this.bracketservice.changeMessage("deactive"); 
           }  
           else if(this.matchup==2) {
             this.s_t_m2=true
             this.s_t_m1=false
             this.bracketservice.changeMessage("deactive"); 
           }
      }
      else if(this.bracketType=='option2'&& this.parentValue==5) {  
        this.bracket_id=14
        if(this.matchup==1)
        {
            this.s_t_m1=true
            this.s_t_m2=false
            this.s_t_m3=false
            this.bracketservice.changeMessage("deactive")  
        }
        else if(this.matchup==2)
        {
             this.s_t_m1=false
             this.s_t_m2=true
             this.s_t_m3=false
             this.bracketservice.changeMessage("deactive")
             
        }
        else if(this.matchup==3)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=true
              this.bracketservice.changeMessage("active")
        }
      }
      else if(this.bracketType=='option2'&& this.parentValue==6)
      {
        this.bracket_id=15
        if(this.matchup==1)
        {
            this.s_t_m1=true  
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.bracketservice.changeMessage("active")
        }
        else if(this.matchup==2)
        {
             this.s_t_m1=false
             this.s_t_m2=true
             this.s_t_m3=false
             this.s_t_m4=false
             this.bracketservice.changeMessage("deactive") 
        }
        else if(this.matchup==3)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=true
              this.s_t_m4=false
              this.bracketservice.changeMessage("deactive")
        }
        else if(this.matchup==4)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=false
              this.s_t_m4=true
              this.bracketservice.changeMessage("active")
        }
      }
  
      else if(this.bracketType=='option2'&& this.parentValue==7)
      {
        this.bracket_id=16
        //this.bracketactiveDoublefour(this.matchup);
        if(this.matchup==1)
        {
            this.s_t_m1=true  
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.bracketservice.changeMessage("active")
        }
        else if(this.matchup==2)
        {
             this.s_t_m1=false
             this.s_t_m2=true
             this.s_t_m3=false
             this.s_t_m4=false
             this.bracketservice.changeMessage("deactive") 
        }
        else if(this.matchup==3)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=true
              this.s_t_m4=false
              this.bracketservice.changeMessage("deactive")
        }
        else if(this.matchup==4)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=false
              this.s_t_m4=true
              this.bracketservice.changeMessage("deactive")
        }
      }
      else if(this.bracketType=='option2'&& this.parentValue==8)
      {
        this.bracket_id=17
        if(this.matchup==1)
        {
            this.s_t_m1=true  
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.bracketservice.changeMessage("deactive")
        }
        else if(this.matchup==2)
        {
             this.s_t_m1=false
             this.s_t_m2=true
             this.s_t_m3=false
             this.s_t_m4=false
             this.bracketservice.changeMessage("deactive") 
        }
        else if(this.matchup==3)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=true
              this.s_t_m4=false
              this.bracketservice.changeMessage("deactive")
        }
        else if(this.matchup==4)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=false
              this.s_t_m4=true
              this.bracketservice.changeMessage("deactive")
        }
      }
      else if(this.bracketType=='option2'&& this.parentValue==9)
      {
        this.bracket_id=18
        if(this.matchup==1)
        {
            this.s_t_m1=true
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.bracketservice.changeMessage("deactive")
        }
        else if(this.matchup==2)
        {
             this.s_t_m1=false
             this.s_t_m2=true
             this.s_t_m3=false
             this.s_t_m4=false
             this.s_t_m5=false
             this.bracketservice.changeMessage("deactive") 
        }
        else if(this.matchup==3)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=true
              this.s_t_m4=false
              this.s_t_m5=false
              this.bracketservice.changeMessage("active")
        }
        else if(this.matchup==4)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=false
              this.s_t_m4=true
              this.s_t_m5=false
              this.bracketservice.changeMessage("deactive")
        }
        else if(this.matchup==5)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=false
              this.s_t_m4=false
              this.s_t_m5=true
              this.bracketservice.changeMessage("deactive")
        }
      }
  
  
  
  
  
      else if(this.bracketType=='option2'&& this.parentValue==10)
      {
        this.bracket_id=19
        if(this.matchup==1)  
        {
            this.s_t_m1=true
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
            this.bracketservice.changeMessage("deactive")
        }
        else if(this.matchup==2)
        {
             this.s_t_m1=false
             this.s_t_m2=true
             this.s_t_m3=false
             this.s_t_m4=false
             this.s_t_m5=false
             this.s_t_m6=false
             this.bracketservice.changeMessage("deactive")
        }
        else if(this.matchup==3)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=true
              this.s_t_m4=false
              this.s_t_m5=false
              this.s_t_m6=false
              this.bracketservice.changeMessage("active")
        }
        else if(this.matchup==4)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=false
              this.s_t_m4=true
              this.s_t_m5=false
              this.s_t_m6=false
              this.bracketservice.changeMessage("active")
        }
        else if(this.matchup==5)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=false
              this.s_t_m4=false
              this.s_t_m5=true
              this.s_t_m6=false
              this.bracketservice.changeMessage("deactive")
        }
        else if(this.matchup==6)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=false
              this.s_t_m4=false
              this.s_t_m5=false
              this.s_t_m6=true
              this.bracketservice.changeMessage("deactive") 
        }
      }
      else if(this.bracketType=='option2'&& this.parentValue==11)
      {
        this.bracket_id=20
        if(this.matchup==1)
        {
            this.s_t_m1=true
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=false
            this.bracketservice.changeMessage("deactive") 
        }
        else if(this.matchup==2)
        {
             this.s_t_m1=false
             this.s_t_m2=true
             this.s_t_m3=false
             this.s_t_m4=false
             this.s_t_m5=false
             this.s_t_m6=false
             this.s_t_m7=false
             this.bracketservice.changeMessage("deactive") 
        }
        else if(this.matchup==3)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=true
              this.s_t_m4=false
              this.s_t_m5=false
              this.s_t_m6=false
              this.s_t_m7=false
              this.bracketservice.changeMessage("active") 
        }
        else if(this.matchup==4)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=false
              this.s_t_m4=true
              this.s_t_m5=false
              this.s_t_m6=false
              this.s_t_m7=false
              this.bracketservice.changeMessage("active") 
        }
        else if(this.matchup==5)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=false
              this.s_t_m4=false
              this.s_t_m5=true
              this.s_t_m6=false
              this.s_t_m7=false
              this.bracketservice.changeMessage("deactive") 
        }
        else if(this.matchup==6)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=false
              this.s_t_m4=false
              this.s_t_m5=false
              this.s_t_m6=true
              this.s_t_m7=false
              this.bracketservice.changeMessage("deactive") 
        }
        else if(this.matchup==7)
        {
              this.s_t_m1=false
              this.s_t_m2=false
              this.s_t_m3=false
              this.s_t_m4=false
              this.s_t_m5=false
              this.s_t_m6=false
              this.s_t_m7=true
              this.bracketservice.changeMessage("active") 
        }
      }
      else if(this.bracketType=='option2'&& this.parentValue==12)
      {
        this.bracket_id=21
        this.bracketactiveDoubleEight(this.matchup);    
        if(this.matchup==1 || this.matchup==4 || this.matchup==5 ||this.matchup==8){ this.bracketservice.changeMessage("active"); }
        else { this.bracketservice.changeMessage("deactive"); } 
      }
       
      else if(this.bracketType=='option2'&& this.parentValue==13)
      {
        this.bracket_id=22
        this.bracketactiveDoubleEight(this.matchup);  
        if(this.matchup==1 || this.matchup==4 || this.matchup==8){ this.bracketservice.changeMessage("active"); }
        else { this.bracketservice.changeMessage("deactive"); } 
      }
      else if(this.bracketType=='option2'&& this.parentValue==14)
      {
        this.bracket_id=23
        this.bracketactiveDoubleEight(this.matchup);  
        if(this.matchup==1 || this.matchup==8){ this.bracketservice.changeMessage("active"); }
        else { this.bracketservice.changeMessage("deactive"); } 
      }
      else if(this.bracketType=='option2'&& this.parentValue==15)
      {
        this.bracket_id=24
        this.bracketactiveDoubleEight(this.matchup);  
        if(this.matchup==1 ){ this.bracketservice.changeMessage("active"); }
        else { this.bracketservice.changeMessage("deactive"); } 
      }
      else if(this.bracketType=='option2'&& this.parentValue==16)
      {
        this.bracket_id=25
        this.bracketactiveDoubleEight(this.matchup);  
        this.bracketservice.changeMessage("deactive");
      }
      else if(this.bracketType=='option3'&& this.parentValue==4)
      {
        this.bracket_id=26
        this.bracketactive3Gametwo(this.matchup); 
        this.bracketservice.changeMessage("deactive");
      }
      else if(this.bracketType=='option3'&& this.parentValue==5)
      {
        this.bracket_id=27
        this.bracketactive3Gamethree(this.matchup); 
        if(this.matchup==1 || this.matchup==3){ this.bracketservice.changeMessage("active"); }
        else { this.bracketservice.changeMessage("deactive"); }
      }
      else if(this.bracketType=='option3'&& this.parentValue==6)
      {
        this.bracket_id=28
        this.bracketactive3Gamefour(this.matchup); 
        if(this.matchup==1 || this.matchup==4){ this.bracketservice.changeMessage("active"); }
        else { this.bracketservice.changeMessage("deactive"); }
      }
      else if(this.bracketType=='option3'&& this.parentValue==7)
      {
        this.bracket_id=29
        this.bracketactive3Gamefour(this.matchup); 
        if(this.matchup==1){ this.bracketservice.changeMessage("active"); }
        else { this.bracketservice.changeMessage("deactive"); }
      }
      else if(this.bracketType=='option3'&& this.parentValue==8)
      {
        this.bracket_id=30
        this.bracketactive3Gamefour(this.matchup);  
        this.bracketservice.changeMessage("deactive");    
      }
      else if(this.bracketType=='option3'&& this.parentValue==9)
      {
        this.bracket_id=31
        this.bracketactive3Gamefive(this.matchup); 
        if(this.matchup==3){ this.bracketservice.changeMessage("active"); }
        else { this.bracketservice.changeMessage("deactive"); }
      }
      else if(this.bracketType=='option3'&& this.parentValue==10)
      {
        this.bracket_id=32
        this.bracketactive3GameSix(this.matchup)
        if(this.matchup==3 || this.matchup==4){ this.bracketservice.changeMessage("active"); }
        else { this.bracketservice.changeMessage("deactive"); }
      }
      else if(this.bracketType=='option3'&& this.parentValue==11)
      {
        this.bracket_id=33
        this.bracketactive3GameSeven(this.matchup)
        if(this.matchup==3 || this.matchup==4 || this.matchup==7){ this.bracketservice.changeMessage("active"); }
        else { this.bracketservice.changeMessage("deactive"); }
      }
      else if(this.bracketType=='option3'&& this.parentValue==12)
      {
        this.bracket_id=34
        this.bracketactive3GameEight(this.matchup)
        if(this.matchup==1 || this.matchup==4 || this.matchup==5 || this.matchup==8){ this.bracketservice.changeMessage("active"); }
        else { this.bracketservice.changeMessage("deactive"); }
      }
      else if(this.bracketType=='option3'&& this.parentValue==13)
      {
        this.bracket_id=35  
        this.bracketactive3GameEight(this.matchup)
        if(this.matchup==1 || this.matchup==4 || this.matchup==8){ this.bracketservice.changeMessage("active"); }
        else { this.bracketservice.changeMessage("deactive"); }
      }
      else if(this.bracketType=='option3'&& this.parentValue==14)
      {
        this.bracket_id=36
        this.bracketactive3GameEight(this.matchup)
        if(this.matchup==1 || this.matchup==8){ this.bracketservice.changeMessage("active"); }
        else { this.bracketservice.changeMessage("deactive"); }
      }
      else if(this.bracketType=='option3'&& this.parentValue==15)
      {
        this.bracket_id=37
        this.bracketactive3GameEight(this.matchup)
        if(this.matchup==1 ){ this.bracketservice.changeMessage("active"); }
        else { this.bracketservice.changeMessage("deactive"); }
      }
      else if(this.bracketType=='option3'&& this.parentValue==16)
      {
        this.bracket_id=38
        this.bracketactive3GameEight(this.matchup);
        this.bracketservice.changeMessage("deactive");
      }
      
      else if(this.bracketType=='option4'&& this.parentValue==7)
      {
        this.bracket_id=39
        this.bracketactive4Gamefour(this.matchup);  
        if(this.matchup==1 ){ this.bracketservice.changeMessage("active"); }
        else { this.bracketservice.changeMessage("deactive"); }  
      }
      else if(this.bracketType=='option5'&& this.parentValue==4)
      {
        this.bracket_id=40
        this.bracketactiveConsolationtwo(this.matchup); 
        this.bracketservice.changeMessage("deactive");
      }
      else if(this.bracketType=='option5'&& this.parentValue==6)
      {
        this.bracket_id=41
        this.bracketactiveConsolationfour(this.matchup);   
        if(this.matchup==3 || this.matchup==4){ this.bracketservice.changeMessage("active"); }
        else if(this.matchup==1 || this.matchup==2) { this.bracketservice.changeMessage("deactive"); }   
      }
      else if(this.bracketType=='option5'&& this.parentValue==7)
      {
        this.bracket_id=42
        this.bracketactiveConsolationfour(this.matchup);   
        if(this.matchup==4){ this.bracketservice.changeMessage("active"); }
        else if(this.matchup==1 || this.matchup==2 || this.matchup==3) { this.bracketservice.changeMessage("deactive"); }   
      }
      else if(this.bracketType=='option5'&& this.parentValue==8)
      {
        this.bracket_id=43
        this.bracketactiveConsolationfour(this.matchup);   
        if(this.matchup==1 || this.matchup==2 || this.matchup==3 || this.matchup==4) { this.bracketservice.changeMessage("deactive"); } 
      }
      else if(this.bracketType=='option5'&& this.parentValue==10)
      {
        this.bracket_id=44
        this.bracketactiveConsolationSix(this.matchup);   
        if(this.matchup==1 || this.matchup==2 ) { this.bracketservice.changeMessage("active"); } 
        else if( this.matchup==3 || this.matchup==4 || this.matchup==5 || this.matchup==6) { this.bracketservice.changeMessage("deactive"); } 
      }
      else if(this.bracketType=='option5'&& this.parentValue==12)
      {
        this.bracket_id=45
        this.bracketactiveConsolationEight(this.matchup);   
        if(this.matchup==1 || this.matchup==2 || this.matchup==3 || this.matchup==4) { this.bracketservice.changeMessage("active"); } 
        else if( this.matchup==5 || this.matchup==6 || this.matchup==7 || this.matchup==8) { this.bracketservice.changeMessage("deactive"); }
      }
      else if(this.bracketType=='option5'&& this.parentValue==16)
      {
        this.bracket_id=46
        this.bracketactiveConsolationEight(this.matchup);   
        if( this.matchup==1 || this.matchup==2 || this.matchup==3 || this.matchup==4 || this.matchup==5 || this.matchup==6) { this.bracketservice.changeMessage("deactive"); }
      }
      

       
  
    }
    bracketactivefour(matchup)
    {

     

      if(matchup==1)
      {
          this.s_t_m1=true
          this.s_t_m2=false
          this.s_t_m3=false
          this.s_t_m4=false
      }
      else if(matchup==2)
      {
           this.s_t_m1=false
           this.s_t_m2=true
           this.s_t_m3=false
           this.s_t_m4=false
           
      }
      else if(matchup==3)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=true
            this.s_t_m4=false
      }
      else if(matchup==4)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=true
      }
    }
    bracketactivefive(matchup)
    {
      if(matchup==1)
      {
          this.s_t_m1=true
          this.s_t_m2=false
          this.s_t_m3=false
          this.s_t_m4=false
          this.s_t_m5=false
      }
      else if(matchup==2)
      {
           this.s_t_m1=false
           this.s_t_m2=true
           this.s_t_m3=false
           this.s_t_m4=false
           this.s_t_m5=false
           
      }
      else if(matchup==3)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=true
            this.s_t_m4=false
            this.s_t_m5=false
      }
      else if(matchup==4)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=true
            this.s_t_m5=false
      }
      else if(matchup==5)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=true
      }
    }
    bracketactiveSix(matchup)
    {
      if(matchup==1)
      {
          this.s_t_m1=true
          this.s_t_m2=false
          this.s_t_m3=false
          this.s_t_m4=false
          this.s_t_m5=false
          this.s_t_m6=false
      }
      else if(matchup==2)
      {
           this.s_t_m1=false
           this.s_t_m2=true
           this.s_t_m3=false
           this.s_t_m4=false
           this.s_t_m5=false
           this.s_t_m6=false
      }
      else if(matchup==3)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=true
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
      }
      else if(matchup==4)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=true
            this.s_t_m5=false
            this.s_t_m6=false
      }
      else if(matchup==5)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=true
            this.s_t_m6=false
      }
      else if(matchup==6)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=true
      }
    }
    bracketactiveSeven(matchup)
    {
      if(matchup==1)
      {
          this.s_t_m1=true
          this.s_t_m2=false
          this.s_t_m3=false
          this.s_t_m4=false
          this.s_t_m5=false
          this.s_t_m6=false
          this.s_t_m7=false
      }
      else if(matchup==2)
      {
           this.s_t_m1=false
           this.s_t_m2=true
           this.s_t_m3=false
           this.s_t_m4=false
           this.s_t_m5=false
           this.s_t_m6=false
           this.s_t_m7=false
      }
      else if(matchup==3)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=true
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=false
      }
      else if(matchup==4)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=true
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=false
      }
      else if(matchup==5)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=true
            this.s_t_m6=false
            this.s_t_m7=false
      }
      else if(matchup==6)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=true
            this.s_t_m7=false
      }
      else if(matchup==7)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=true
      }
    }

    bracketactiveEight(matchup)
    {
      if(matchup==1)
      {
          this.s_t_m1=true
          this.s_t_m2=false
          this.s_t_m3=false
          this.s_t_m4=false
          this.s_t_m5=false
          this.s_t_m6=false
          this.s_t_m7=false
          this.s_t_m8=false
      }
      else if(matchup==2)
      {
           this.s_t_m1=false
           this.s_t_m2=true
           this.s_t_m3=false
           this.s_t_m4=false
           this.s_t_m5=false
           this.s_t_m6=false
           this.s_t_m7=false
           this.s_t_m8=false
      }
      else if(matchup==3)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=true
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=false
            this.s_t_m8=false
      }
      else if(matchup==4)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=true
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=false
            this.s_t_m8=false
      }
      else if(matchup==5)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=true
            this.s_t_m6=false
            this.s_t_m7=false
            this.s_t_m8=false
      }
      else if(matchup==6)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=true
            this.s_t_m7=false
            this.s_t_m8=false
      }
      else if(matchup==7)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=true
            this.s_t_m8=false
      }
      else if(matchup==8)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=false
            this.s_t_m8=true
      }
    }

    bracketactiveDoubleEight(matchup)
    {
      if(matchup==1)
      {
          this.s_t_m1=true
          this.s_t_m2=false
          this.s_t_m3=false
          this.s_t_m4=false
          this.s_t_m5=false
          this.s_t_m6=false
          this.s_t_m7=false
          this.s_t_m8=false
      }
      else if(matchup==2)
      {
           this.s_t_m1=false
           this.s_t_m2=true
           this.s_t_m3=false
           this.s_t_m4=false
           this.s_t_m5=false
           this.s_t_m6=false
           this.s_t_m7=false
           this.s_t_m8=false
      }
      else if(matchup==3)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=true
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=false
            this.s_t_m8=false
      }
      else if(matchup==4)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=true
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=false
            this.s_t_m8=false
      }
      else if(matchup==5)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=true
            this.s_t_m6=false
            this.s_t_m7=false
            this.s_t_m8=false
      }
      else if(matchup==6)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=true
            this.s_t_m7=false
            this.s_t_m8=false
      }
      else if(matchup==7)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=true
            this.s_t_m8=false
      }
      else if(matchup==8)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=false
            this.s_t_m8=true
      }
    }


    bracketactive3Gametwo(matchup){
      if(matchup==1)
      { 
       this.s_t_m1=true
        this.s_t_m2=false
      }  
      else if(matchup==2)
      {
        this.s_t_m2=true
        this.s_t_m1=false
      }
    }

    bracketactive3Gamethree(matchup){
      if(matchup==1)
      {
          this.s_t_m1=true
          this.s_t_m2=false
          this.s_t_m3=false
      }
      else if(matchup==2)
      {
           this.s_t_m1=false
           this.s_t_m2=true
           this.s_t_m3=false
      }
      else if(matchup==3)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=true
      }
    }

    bracketactive3Gamefour(matchup)
    {
      if(matchup==1)
      {
          this.s_t_m1=true
          this.s_t_m2=false
          this.s_t_m3=false
          this.s_t_m4=false
      }
      else if(matchup==2)
      {
           this.s_t_m1=false
           this.s_t_m2=true
           this.s_t_m3=false
           this.s_t_m4=false
           
      }
      else if(matchup==3)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=true
            this.s_t_m4=false
      }
      else if(matchup==4)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=true
      }
    }

    bracketactive3Gamefive(matchup)
    {
      if(matchup==1)
      {
          this.s_t_m1=true
          this.s_t_m2=false
          this.s_t_m3=false
          this.s_t_m4=false
          this.s_t_m5=false
      }
      else if(matchup==2)
      {
           this.s_t_m1=false
           this.s_t_m2=true
           this.s_t_m3=false
           this.s_t_m4=false
           this.s_t_m5=false
           
      }
      else if(matchup==3)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=true
            this.s_t_m4=false
            this.s_t_m5=false
      }
      else if(matchup==4)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=true
            this.s_t_m5=false
      }
      else if(matchup==5)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=true
      }
    }

    bracketactive3GameSix(matchup)
    {
      if(matchup==1)
      {
          this.s_t_m1=true
          this.s_t_m2=false
          this.s_t_m3=false
          this.s_t_m4=false
          this.s_t_m5=false
          this.s_t_m6=false
      }
      else if(matchup==2)
      {
           this.s_t_m1=false
           this.s_t_m2=true
           this.s_t_m3=false
           this.s_t_m4=false
           this.s_t_m5=false
           this.s_t_m6=false
      }
      else if(matchup==3)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=true
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
      }
      else if(matchup==4)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=true
            this.s_t_m5=false
            this.s_t_m6=false
      }
      else if(matchup==5)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=true
            this.s_t_m6=false
      }
      else if(matchup==6)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=true
      }
    }
    bracketactive3GameSeven(matchup)
    {
      if(matchup==1)
      {
          this.s_t_m1=true
          this.s_t_m2=false
          this.s_t_m3=false
          this.s_t_m4=false
          this.s_t_m5=false
          this.s_t_m6=false
          this.s_t_m7=false
      }
      else if(matchup==2)
      {
           this.s_t_m1=false
           this.s_t_m2=true
           this.s_t_m3=false
           this.s_t_m4=false
           this.s_t_m5=false
           this.s_t_m6=false
           this.s_t_m7=false
      }
      else if(matchup==3)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=true
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=false
      }
      else if(matchup==4)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=true
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=false
      }
      else if(matchup==5)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=true
            this.s_t_m6=false
            this.s_t_m7=false
      }
      else if(matchup==6)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=true
            this.s_t_m7=false
      }
      else if(matchup==7)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=true
      }
    }

    bracketactive3GameEight(matchup)
    {
      if(matchup==1)
      {
          this.s_t_m1=true
          this.s_t_m2=false
          this.s_t_m3=false
          this.s_t_m4=false
          this.s_t_m5=false
          this.s_t_m6=false
          this.s_t_m7=false
          this.s_t_m8=false
      }
      else if(matchup==2)
      {
           this.s_t_m1=false
           this.s_t_m2=true
           this.s_t_m3=false
           this.s_t_m4=false
           this.s_t_m5=false
           this.s_t_m6=false
           this.s_t_m7=false
           this.s_t_m8=false
      }
      else if(matchup==3)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=true
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=false
            this.s_t_m8=false
      }
      else if(matchup==4)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=true
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=false
            this.s_t_m8=false
      }
      else if(matchup==5)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=true
            this.s_t_m6=false
            this.s_t_m7=false
            this.s_t_m8=false
      }
      else if(matchup==6)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=true
            this.s_t_m7=false
            this.s_t_m8=false
      }
      else if(matchup==7)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=true
            this.s_t_m8=false
      }
      else if(matchup==8)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=false
            this.s_t_m8=true
      }
    }

    bracketactive4Gamefour(matchup)
    {
      if(matchup==1)
      {
          this.s_t_m1=true
          this.s_t_m2=false
          this.s_t_m3=false
          this.s_t_m4=false
      }
      else if(matchup==2)
      {
           this.s_t_m1=false
           this.s_t_m2=true
           this.s_t_m3=false
           this.s_t_m4=false
           
      }
      else if(matchup==3)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=true
            this.s_t_m4=false
      }
      else if(matchup==4)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=true
      }
    }

    
    
    bracketactiveConsolationtwo(matchup){
      if(matchup==1)
      { 
       this.s_t_m1=true
        this.s_t_m2=false
      }  
      else if(matchup==2)
      {
        this.s_t_m2=true
        this.s_t_m1=false
      }
    }
    
    bracketactiveConsolationthree(matchup){
      if(matchup==1)
      {
          this.s_t_m1=true
          this.s_t_m2=false
          this.s_t_m3=false
      }
      else if(matchup==2)
      {
           this.s_t_m1=false
           this.s_t_m2=true
           this.s_t_m3=false
      }
      else if(matchup==3)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=true
      }
    }

    bracketactiveConsolationfour(matchup)
    {
      if(matchup==1)
      {
          this.s_t_m1=true
          this.s_t_m2=false
          this.s_t_m3=false
          this.s_t_m4=false
      }
      else if(matchup==2)
      {
           this.s_t_m1=false
           this.s_t_m2=true
           this.s_t_m3=false
           this.s_t_m4=false
           
      }
      else if(matchup==3)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=true
            this.s_t_m4=false
      }
      else if(matchup==4)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=true
      }
    }

    bracketactiveConsolationfive(matchup)
    {
      if(matchup==1)
      {
          this.s_t_m1=true
          this.s_t_m2=false
          this.s_t_m3=false
          this.s_t_m4=false
          this.s_t_m5=false
      }
      else if(matchup==2)
      {
           this.s_t_m1=false
           this.s_t_m2=true
           this.s_t_m3=false
           this.s_t_m4=false
           this.s_t_m5=false
           
      }
      else if(matchup==3)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=true
            this.s_t_m4=false
            this.s_t_m5=false
      }
      else if(matchup==4)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=true
            this.s_t_m5=false
      }
      else if(matchup==5)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=true
      }
    }

    bracketactiveConsolationSix(matchup)
    {
      if(matchup==1)
      {
          this.s_t_m1=true
          this.s_t_m2=false
          this.s_t_m3=false
          this.s_t_m4=false
          this.s_t_m5=false
          this.s_t_m6=false
      }
      else if(matchup==2)
      {
           this.s_t_m1=false
           this.s_t_m2=true
           this.s_t_m3=false
           this.s_t_m4=false
           this.s_t_m5=false
           this.s_t_m6=false
      }
      else if(matchup==3)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=true
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
      }
      else if(matchup==4)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=true
            this.s_t_m5=false
            this.s_t_m6=false
      }
      else if(matchup==5)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=true
            this.s_t_m6=false
      }
      else if(matchup==6)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=true
      }
    }
    bracketactiveConsolationSeven(matchup)
    {
      if(matchup==1)
      {
          this.s_t_m1=true
          this.s_t_m2=false
          this.s_t_m3=false
          this.s_t_m4=false
          this.s_t_m5=false
          this.s_t_m6=false
          this.s_t_m7=false
      }
      else if(matchup==2)
      {
           this.s_t_m1=false
           this.s_t_m2=true
           this.s_t_m3=false
           this.s_t_m4=false
           this.s_t_m5=false
           this.s_t_m6=false
           this.s_t_m7=false
      }
      else if(matchup==3)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=true
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=false
      }
      else if(matchup==4)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=true
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=false
      }
      else if(matchup==5)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=true
            this.s_t_m6=false
            this.s_t_m7=false
      }
      else if(matchup==6)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=true
            this.s_t_m7=false
      }
      else if(matchup==7)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=true
      }
    }

    bracketactiveConsolationEight(matchup)
    {
      if(matchup==1)
      {
          this.s_t_m1=true
          this.s_t_m2=false
          this.s_t_m3=false
          this.s_t_m4=false
          this.s_t_m5=false
          this.s_t_m6=false
          this.s_t_m7=false
          this.s_t_m8=false
      }
      else if(matchup==2)
      {
           this.s_t_m1=false
           this.s_t_m2=true
           this.s_t_m3=false
           this.s_t_m4=false
           this.s_t_m5=false
           this.s_t_m6=false
           this.s_t_m7=false
           this.s_t_m8=false
      }
      else if(matchup==3)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=true
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=false
            this.s_t_m8=false
      }
      else if(matchup==4)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=true
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=false
            this.s_t_m8=false
      }
      else if(matchup==5)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=true
            this.s_t_m6=false
            this.s_t_m7=false
            this.s_t_m8=false
      }
      else if(matchup==6)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=true
            this.s_t_m7=false
            this.s_t_m8=false
      }
      else if(matchup==7)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=true
            this.s_t_m8=false
      }
      else if(matchup==8)
      {
            this.s_t_m1=false
            this.s_t_m2=false
            this.s_t_m3=false
            this.s_t_m4=false
            this.s_t_m5=false
            this.s_t_m6=false
            this.s_t_m7=false
            this.s_t_m8=true
      }
    }

}
