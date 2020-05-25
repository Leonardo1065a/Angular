import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  clientForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
    }),
    phones: this.fb.array(['']),
    children: this.fb.array([])  
  });

  phones = this.clientForm.get('phones') as FormArray;
  children = this.clientForm.get('children') as FormArray;

  ngOnInit() { }

  onSubmit() {
    console.log(this.clientForm.value); 
  }

  addPhone() {
    this.phones.push(this.fb.control(''));
  }

  addChild() {
    this.children.push(
      this.fb.group({
        name: [''],
        age: ['']
      })
    );
  }

}
