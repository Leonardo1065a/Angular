import { Observable, Observer, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cold-observable',
  templateUrl: './cold-observable.component.html',
  styleUrls: ['./cold-observable.component.css']
})
export class ColdObservableComponent implements OnInit {

  subscription1: Subscription;
  subscription2: Subscription;

  n1: number = 0;
  n2: number = 0

  s1: string = '';
  s2: string = '';
  constructor() { }

  ngOnInit() {
    this.s1 = 'Loading...';
    this.s2 = 'Loading...';

    const myIntervalObservable = new Observable(
      (observer: Observer<any>) => {
        let n: number = 0;
        let id = setInterval(() => {
          n++;
          console.log("from Observable: " + n);
          if (n == 10) {
            observer.complete();
          } else if (n % 2 == 0) {
            observer.next(n);

          }
        }, 1000);
        return () => {
          clearInterval(id);
        }
      }
    );

    this.subscription1 = myIntervalObservable.subscribe(
      (n) => { this.n1 = n },
      (error) => { this.s1 = "Error: " + error },
      () => { this.s1 = "Completed" }
    );

    this.s2 = 'waiting for interval'
    setInterval(() => {
      this.subscription2 = myIntervalObservable.subscribe(
        (n) => { this.n2 = n },
        (error) => { this.s2 = "Error: " + error },
        () => { this.s2 = "Completed" }
      );
    }, 3000);


    setTimeout(() => {
      this.subscription1.unsubscribe();
      this.subscription2.unsubscribe();
    }, 11000);


  }

}