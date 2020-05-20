import { Component, OnInit, ViewChild } from "@angular/core";
import { from, fromEvent, interval, Observable, Observer, Subscription, Subject, timer } from "rxjs";
import { map, delay, filter, tap, take, first, last, debounceTime, takeWhile, takeUntil } from "rxjs/operators";
import { MatRipple } from '@angular/material';

@Component({
  selector: "app-operators",
  templateUrl: "./operators.component.html",
  styleUrls: ["./operators.component.css"],
})
export class OperatorsComponent implements OnInit {

  searchInput: string = '';
  @ViewChild(MatRipple) ripple: MatRipple;
  constructor() {}

  ngOnInit() {}

  mapClick() {
    from([1, 2, 3, 5, 6, 7])
      .pipe(
        map((i) => "Number: " + i),
        map((i) => i + " ."),
        delay(2000)
      )
      .subscribe((i) => console.log(i));

    fromEvent(document, "click")
      .pipe(map((e: MouseEvent) => ({ x: e.screenX, y: e.screenY })))
      .subscribe((pos) => console.log(pos));
  }

  filterClick() {
    from([1, 2, 3, 5, 6, 7])
      .pipe(filter((i) => i % 2 == 1))
      .subscribe((i) => console.log(i));

    interval(1000)
      .pipe(
        filter((i) => i % 2 == 0),
        map((i) => "value: " + i),
        delay(1000)
      )
      .subscribe((i) => console.log(i));
  }

  tapClick() {
    interval(1000)
      .pipe(
        tap((i) => console.log("before filtering: ", i)),
        filter((i) => i % 2 == 0),
        tap((i) => console.warn("after filtering: ", i)),
        map((i) => "value: " + i),
        tap((i) => console.error("after map: ", i)),
        delay(1000)
      )
      .subscribe((i) => console.log(i));
  }

  takeClick() {
    const observable = new Observable((observer: Observer<number>) => {
      let i;
      for (i = 0; i < 20; i++)
        setTimeout(() => observer.next(Math.floor(Math.random() * 100)), i * 100);
      setTimeout(() => observer.complete(), i * 100);
    });

    const s: Subscription = observable
      .pipe(
        tap(i => console.log(i)),
        //take(10),
        // first()
        last()
      )
      .subscribe((v) => console.log('Output: ', v),
        (erro) => console.log(erro),
        () => console.log('completou')
      );

    const interv = setInterval(() => {
      console.log('Checking...');
      if(s.closed) {
        console.warn('subscription CLOSED!');
        clearInterval(interv);
      }
    }, 200);
  }

  debounceTimeClick(){
    fromEvent(document, 'click')
      .pipe(
        debounceTime(500)
      )
      .subscribe((e: MouseEvent) => {
        console.log('Click with debounceTime: ', e);
        this.launchRipple();
      });
  }

  launchRipple() {
    const rippleRef = this.ripple.launch({
      persistent: true, centered: true
    });
    rippleRef.fadeOut();
  }

  searchEntry$ : Subject<string> = new Subject<string>();
  searchByUsingDebounce(event){
    this.searchEntry$.next(this.searchInput);
  }

  debounceTimeSearch(){
    this.searchEntry$
      .pipe(debounceTime(500))
      .subscribe((s) => console.log(s));
  }

  takeWhileClick(){
    interval(500)
    .pipe(
      takeWhile((value, index) => (value < 5))
    )
    .subscribe((i) => console.log('takeWhile: ' + i),
    (error) => console.error(error),
    () => console.warn('Completed!'));
  }

  takeUntilClick(){

    let dueTime = timer(5000);

    interval(500)
    .pipe(
      takeUntil(dueTime)
    )
    .subscribe((i) => console.log('takeWhile: ' + i),
    (error) => console.error(error),
    () => console.warn('Completed!'));
  }
}
