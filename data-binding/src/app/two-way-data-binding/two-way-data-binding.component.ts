import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-two-way-data-binding',
  templateUrl: './two-way-data-binding.component.html',
  styleUrls: ['./two-way-data-binding.component.css']
})
export class TwoWayDataBindingComponent implements OnInit {

  name1: string = '';
  name2: string = '';

  public client = {
    firstName: 'Leo',
    lastName: 'Olie',
    address: '',
    age: null,
  }

  constructor() { }

  ngOnInit() {
  }

}
