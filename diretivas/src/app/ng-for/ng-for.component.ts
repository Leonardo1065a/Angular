import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-for',
  templateUrl: './ng-for.component.html',
  styleUrls: ['./ng-for.component.css']
})
export class NgForComponent implements OnInit {

  names = [
    'Maria',
    'João',
    'Jose',
    'Fátima'
  ];
  cities = [
    { name: "São Paulo", state: "SP" },
    { name: "Ceará", state: "CE" },
    { name: "Bahia", state: "BA" },
    { name: "Minas Gerais", state: "MG" },
  ];

  constructor() { }

  ngOnInit() {
  }

}
