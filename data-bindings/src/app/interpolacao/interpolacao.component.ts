import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interpolacao',
  templateUrl: './interpolacao.component.html',
  styleUrls: ['./interpolacao.component.css']
})
export class InterpolacaoComponent implements OnInit {

  constructor() { }

  title;
  subTitle;
  text;
  save = false;
  colors = [ 'primary', 'accent', 'warn', ''];
  idColor = 0;
  ngOnInit() {
    setInterval( () => {
      this.idColor = (this.idColor + 1) % this.colors.length;
    }, 500);
  }

  ok(){
    this.save = !this.save;
  }

}
