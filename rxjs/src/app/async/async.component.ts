import { Observer } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map, toArray } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

interface User {
  login: string;
  name: string;
}

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css']
})
export class AsyncComponent implements OnInit {

  options$: Observable<string[]>;
  user$: Observable<User>;

  constructor() { }

  ngOnInit() {
    this.options$ = Observable.create(
      (observe: Observer<string>) => {
        for(let i = 0; i < 10; i++) {
          observe.next(`this is my: ${i}th option`);
        }
        observe.complete();
      }).pipe(
        map(s => `${s}!`),
        toArray(),
        delay(1000)
      );
      
      //this.options$.subscribe(s => console.log(s));

      this.user$ = new Observable<User>((observer: Observer<User>) => {
        let names = ['Mr. Bean', 'Mr. Jonh', 'Mr. Leonard']
        let logins = ['bean', 'jonh', 'leonard']
        let i = 0;
        
        setInterval(() => {
          if(i == 3)
            observer.complete();
          else 
            observer.next({login: logins[i], name: names[i]});
          i++
        }, 3000);
      });
      
      this.user$.subscribe((s) => console.log(s));
  }

}
