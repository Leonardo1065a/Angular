import { fromEvent } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

  @ViewChild('myrect') myrect: ElementRef;

  top: number = 40;
  left: number = 40;
  constructor() { }

  ngOnInit() {
    let mousedown = fromEvent(this.myrect.nativeElement, 'mousedown');
    let mousemove = fromEvent(document, 'mousemove');
    let mouseup = fromEvent(document, 'mouseup');

    mousedown.subscribe((ed: MouseEvent) => {
      let x = ed.pageX;
      let y = ed.pageY;

      mousemove
      .pipe(
        takeUntil(mouseup)
      )
      .subscribe((em: MouseEvent) => {
        let offsetX = x - em.pageX;
        let offsetY = y - em.pageY;
        this.top -= offsetY;
        this.left -= offsetX;

        x = em.pageX;
        y = em.pageY;

      })

    })
  }


}
