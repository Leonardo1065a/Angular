import { Subject } from 'rxjs';
import { interval } from 'rxjs';
import { fromEvent, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {

  subscriptionsAreActive: boolean = false;

  private subscriptions: Subscription[] = [];
  unsubscribAll$: Subject<any> = new Subject();
  intervalSubscription: Subscription = null;
  constructor() { }

  ngOnInit() {
    this.checkSubscriptions();
  }

  subscribe() {
    const subscription1 = interval(100)
      .pipe(takeUntil(this.unsubscribAll$))
      .subscribe((i) => console.log(i));
    const subscription2 = fromEvent(document, 'mousemove')
      .pipe(takeUntil(this.unsubscribAll$))
      .subscribe(e => console.log(e));
    this.subscriptions.push(subscription1);
    this.subscriptions.push(subscription2);
  }

  checkSubscriptions() {
    this.intervalSubscription = interval(100).subscribe(() => {
      let active = false;
      this.subscriptions.forEach(element => {
        if(!element.closed)
          active = true;
      });
      this.subscriptionsAreActive = active;
    })
  }

  unsubscribe() {
    this.unsubscribAll$.next();
  }

  ngOnDestroy(){
    if(this.intervalSubscription != null)
      this.intervalSubscription.unsubscribe();
    this.unsubscribe();
    console.log('destroy');
  }

}
