import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {

  firstName = new FormControl('');
  lastName = new FormControl('');

  constructor() { }

  ngOnInit() {
    this.firstName.valueChanges
      .pipe(debounceTime(200))
      .subscribe(newName => console.log(newName));
  }

  setFirtsName() {
    this.firstName.setValue('Jonh');
    console.log(this.firstName.value);
    
  }

}
