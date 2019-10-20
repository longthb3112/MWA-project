import { Component, Input,OnInit } from '@angular/core';
import * as moment from 'moment';
import { getLocaleDateTimeFormat } from '@angular/common';
@Component({
  selector: 'app-timer',
  template: `<b><span [ngStyle]="{color:isLate?'red':'green'}">{{time}}</span></b>`
})
export class TimerComponent implements OnInit {
  
  timeLeft: number = 60;
  isLate = false;
  time:string;
  interval;
@Input("startdate") startDate:Date ;
@Input("enddate") endate:Date ;
ngOnInit(){
    
    var days = moment(this.endate).diff(moment(Date.now()),'days');
    if(days == 0){
        this.startTimer();
    }else if(days > 0){
        this.isLate = false;
       this.time = days + " " + (days > 1 ? "days":"day"); 
    }else{
        this.isLate = true;
        this.time = moment(this.endate).fromNow();
    }
}
  startTimer() {
    this.interval = setInterval(() => {
        var remainTime = new Date(this.endate).valueOf() - Date.now().valueOf();
        if(remainTime> 0){
            this.isLate = false;
            var now = moment();
            var hours = 23 -now.hour();
            var minutes = 60 - now.minute();
            var seconds = 60 - now.second();
            this.time = hours+ ":"+ minutes+":"+ (seconds == 60 ? 0: seconds);
        }else{
            this.isLate = true;
            this.time = moment(this.endate).fromNow();
            this.clearTimer();
        }    
    },1000)
  }

  clearTimer() {
    clearInterval(this.interval);
  }
}