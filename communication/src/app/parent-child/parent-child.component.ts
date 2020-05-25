import { TimerComponent } from './timer/timer.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-parent-child',
  templateUrl: './parent-child.component.html',
  styleUrls: ['./parent-child.component.css']
})
export class ParentChildComponent implements OnInit {

  @ViewChild("stopwatchtwo")
  private myTime: TimerComponent;

  @ViewChild("myP")
  private myp: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  start(){
    this.myTime.start();
  }

  stop(){
    this.myTime.stop();
  }

  clear(){
    this.myTime.clear();
  }

  ngAfterViewInit(){
    console.log(this.myp);
    
  }

}
