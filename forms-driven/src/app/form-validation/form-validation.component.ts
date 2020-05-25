import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent implements OnInit {

  client = {
    firstName: '',
    lastName: '',
    age: null,
    email: '',
    birth: new Date(),
    street: '',
    city: '',
    state: '',
    phone1: '',
    phone2: '',
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.client);
  }

}
