import { Client } from './client-model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-binding',
  templateUrl: './input-binding.component.html',
  styleUrls: ['./input-binding.component.css']
})
export class InputBindingComponent implements OnInit {

  @Input() name: string;
  @Input('otherName') lastname: string;
  @Input() age: number;

  clients: Client[];

  constructor() { 
    this.clients = [
      {id: 1, name: 'Bob', age: 30},
      {id: 2, name: 'John', age: 20},
      {id: 3, name: 'Ana', age: 10},
      {id: 4, name: 'Maria', age: 1},
    ];
  }

  ngOnInit() {
  }

}
