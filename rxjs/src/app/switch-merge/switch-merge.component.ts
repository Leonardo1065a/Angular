import { debounceTime, tap, map, filter, mergeAll, switchAll, switchMap } from "rxjs/operators";
import { fromEvent } from "rxjs";
import { Person, build } from "./person.model";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Observable, from } from "rxjs";

@Component({
  selector: "app-switch-merge",
  templateUrl: "./switch-merge.component.html",
  styleUrls: ["./switch-merge.component.css"],
})
export class SwitchMergeComponent implements OnInit {
  @ViewChild('searchBy') el: ElementRef;
  searchInput: string = "";
  dados: any[] = build();
  people$: Observable<Person[]>;
  constructor() {}

  ngOnInit() {
    //this.firstOption();
    //this.secondOption();
    this.thirdOption();
  }

  firstOption(){
    fromEvent(this.el.nativeElement, 'keyup')
      .subscribe(e => {
        this.filterPeople(this.searchInput)
          .subscribe(res => console.log(res));
      })
  }

  secondOption(){
    let keyup$ = fromEvent(this.el.nativeElement, 'keyup');
    let fetch$ = keyup$.pipe(map((v) => this.filterPeople(this.searchInput)));

    // fetch$
    //   .pipe(mergeAll())  
    //   .subscribe(b => console.log(b));
    
    this.people$ = fetch$.pipe(mergeAll(), tap(v => console.log(v)));
  }

  thirdOption() {
    let keyup$ = fromEvent(this.el.nativeElement, 'keyup');
  /*
    this.people$ = keyup$
      .pipe(map((v) => this.filterPeople(this.searchInput)))
      .pipe(switchAll(), tap(v => console.log(v)));
  */

    this.people$ = keyup$.pipe(
      debounceTime(500),
      tap(() => console.log(this.searchInput)),
      switchMap(() => this.filterPeople(this.searchInput)));

  }

  filterPeople(value: string): Observable<Person[]> {
    return from(this.dados).pipe(
      filter((d) => d.lastName == value),
      map((res) => res),
    );
  }
}
