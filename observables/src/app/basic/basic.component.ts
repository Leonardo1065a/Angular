import { Component, OnInit } from '@angular/core';
import { Observable, Observer, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

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
    const myFirstObservable = new Observable(
      (observer: Observer<number>) => {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.next(4);
        observer.next(5);
        //observer.error("6");
        observer.complete();
      }
    );

    myFirstObservable.subscribe(
      (n: number) => console.log(n),
      (error) => console.error(error),
      () => console.log("Completed.")
    );
    /*
    const timeCount = interval(500);
    timeCount.subscribe(
      (n) => console.log(n)
    )
    console.log("After interval");
    */

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
      (error) => {this.s1 = "Error: " + error},
      () => { this.s1 = "Completed"}
    );

    this.subscription2 = myIntervalObservable.subscribe(
      (n) => { this.n2 = n },
      (error) => {this.s2 = "Error: " + error},
      () => { this.s2 = "Completed"}
    );

    setTimeout(() => {
      this.subscription1.unsubscribe();
      this.subscription2.unsubscribe();
    }, 11000);

    
  }

}
