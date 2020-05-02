import { DataModel } from "./../data.model";
import { GenRandomDataService } from "./../gen-random-data.service";
import { Subject, ReplaySubject, AsyncSubject, BehaviorSubject } from "rxjs";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-subjects",
  templateUrl: "./subjects.component.html",
  styleUrls: ["./subjects.component.css"],
})
export class SubjectsComponent implements OnInit {
  private _subject: Subject<DataModel>;
  private _replaySubject: ReplaySubject<DataModel>;
  private _asyncSubject: AsyncSubject<DataModel>;
  private _behaviorSubject: BehaviorSubject<DataModel>;

  constructor(private dataService: GenRandomDataService) {}

  ngOnInit() {
    this._subject = new Subject<DataModel>();
    this._replaySubject = new ReplaySubject<DataModel>();
    this._asyncSubject = new AsyncSubject<DataModel>();
    this._behaviorSubject = new BehaviorSubject<DataModel>({
      timestamp: 0,
      data: 0,
    });

    this.dataService.dataObservable.subscribe(this._subject);
    this.dataService.dataObservable.subscribe(this._replaySubject);
    this.dataService.dataObservable.subscribe(this._asyncSubject);
    this.dataService.dataObservable.subscribe(this._behaviorSubject);
  }

  connect() {
    this.dataService.dataObservable.connect();
  }

  get subject(): Subject<DataModel> {
    return this._subject as Subject<DataModel>;
  }

  get replaySubject(): ReplaySubject<DataModel> {
    return this._replaySubject as ReplaySubject<DataModel>;
  }

  get asyncSubject(): AsyncSubject<DataModel> {
    return this._asyncSubject as AsyncSubject<DataModel>;
  }

  get behaviorSubject(): BehaviorSubject<DataModel> {
    return this._behaviorSubject as BehaviorSubject<DataModel>;
  }
}
