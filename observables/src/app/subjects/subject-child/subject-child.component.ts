import { DataModel } from './../../data.model';
import { Subject, Subscription } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subject-child',
  templateUrl: './subject-child.component.html',
  styleUrls: ['./subject-child.component.css']
})
export class SubjectChildComponent implements OnInit {

  @Input() subject: Subject<DataModel>;
  @Input() name: string;

  private _subscription: Subscription;
  private _logs: string[] = [];
  public _connected: boolean;

  constructor() { }

  ngOnInit() {
  }

  logData(data: DataModel){
    this.logs.push('Timestamp: ' + data.timestamp + ' Data: ' + data.data);
  }

  connect(){
    this.logs.push('Connected!');
    this._connected = true;
    this._subscription = this.subject.subscribe(
      (data: DataModel) => {
        this.logData(data);
      },
      (error) => { this._connected = false; },
      () => { this._connected = false; this.logs.push('Finished!'); }
    );
  }

  disconnect(){
    this._subscription.unsubscribe();
    this._connected = false;
  }

  get logs(): string[] {
    return this._logs as string[];
  }

  get connected(): boolean {
    return this._connected as boolean;
  }

}
