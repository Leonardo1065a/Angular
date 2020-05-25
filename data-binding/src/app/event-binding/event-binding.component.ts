import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-binding',
  templateUrl: './event-binding.component.html',
  styleUrls: ['./event-binding.component.css']
})
export class EventBindingComponent implements OnInit {

  buttonName = "Click me!";
  i = 0;
  spinneMode = "determinate";
  btnEnable = true;
  value = 0;
  selectDisabled = false;
  selection;

  inputName = 'Leo'

  constructor() { }

  ngOnInit() {
  }

  save() {
    alert('click');
  }

  inc() {
    if (this.i >= 100) {
      alert('100%');
    } else {
      this.i += 10;
      this.value = this.i;
      this.buttonName = "It was clicked " + this.i + " times";
    }
  }

  disabled() {
    this.btnEnable = !this.btnEnable;
    this.spinneMode = "indeterminate";
    setTimeout(() => {
      this.btnEnable = !this.btnEnable;
      this.spinneMode = "determinate";
    }, 3000);
  }

  cbChange(event){
    console.log(event.checked);
    this.selectDisabled = event.checked;
    
  }

  selectionChange(event){
    this.selection = event.value;
  }
}
