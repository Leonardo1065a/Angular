import { tap, catchError, retry, retryWhen, timeout } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable, of, throwError, timer } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.css']
})
export class ErrorHandlingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  startTest(){
    let obj: Observable<any> = new Observable((observe) => {
      for(let i = 0; i < 10; i++){
        if(i == 7)
          observe.error(`An error accurred when i = ${i}`)
        else
          observe.next(i);
      }
    });

    obj
    .pipe(
      map(i => i*10),
      tap(i => console.log(`Before error handling: ${i}`)),
      catchError(error => {
        console.error('Inside catchError', error);
        // return of(0);
        return throwError('throwError: Error');
      }),
      //retry(2),
      retryWhen(i => timer(2000))
    )
    /*
    .subscribe(
      (i) => console.log(`Normal output ${i}`),
      (err) => console.error(err),
      () => console.log('Completed!')
    )
      */
    let obj2: Observable<any> = new Observable((observer) => {
      timer(2000).subscribe((n) => observer.next(1000));
      timer(2500).subscribe((n) => observer.complete());
    });
    obj2
    .pipe(
      timeout(2001)
    )
    .subscribe(
      (i) => console.log(`N: ${i}`),
      (err) => console.error(err),
      () => console.log('Completed!')
    )
  }
}
