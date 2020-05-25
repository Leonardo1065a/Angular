import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-binding',
  templateUrl: './property-binding.component.html',
  styleUrls: ['./property-binding.component.css']
})
export class PropertyBindingComponent implements OnInit {

  color = "warn";
  colors = ['primary', 'accent', 'warn', '']
  idColor = 0;
  desabled = true;
  constructor() { }

  ngOnInit() {
    setInterval( () => {
      this.idColor = (this.idColor + 1) % this.colors.length;
    },1000)
  }

  habilitar(){
    this.desabled = !this.desabled;
  }

}
