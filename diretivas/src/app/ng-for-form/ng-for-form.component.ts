import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-for-form',
  templateUrl: './ng-for-form.component.html',
  styleUrls: ['./ng-for-form.component.css']
})
export class NgForFormComponent implements OnInit {

  name:  String = '';
  address: string = '';
  phone: string = '';
  city: string = '';
  age: number = 0;

  clients = [];

  cities = [
    { name: "São Paulo", state: "SP" },
    { name: "Ceará", state: "CE" },
    { name: "Bahia", state: "BA" },
    { name: "Minas Gerais", state: "MG" },
  ];

  constructor() { }

  ngOnInit() {
  }

  save(){
    this.clients.push({
      name: this.name,
      address: this.address,
      phone: this.phone,
      city: this.city,
      age: this.age
    });
    this.cancel();
    console.log(this.clients);
  }

  cancel(){
    this.name = '';
    this.address = '';
    this.phone = '';
    this.city = '';
    this.age = 0;
  }

  delete(i: number){
    this.clients.splice(i, 1);
  }

}
