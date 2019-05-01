import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AsyncSubject, BehaviorSubject, Subject} from "rxjs";
import {mergeMap, takeUntil, tap} from "rxjs/operators";
import {ILatLon} from "../../models/lat-lon.interface";
import {NominatimService, ILocation} from "weather-core";

@Component({
  selector: 'weather-web-forecast-view',
  templateUrl: './forecast-view.component.html',
  styleUrls: ['./forecast-view.component.scss']
})
export class ForecastViewComponent implements OnInit, OnDestroy {

  public address$: BehaviorSubject<ILocation> = new BehaviorSubject(null);
  private osmId$: BehaviorSubject<number> = new BehaviorSubject(null);

  private destroy$: Subject<boolean> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private nominatim: NominatimService,
  ) {
  }

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .pipe(tap(paramMap => {
        this.initialiseState();
      }))
      .subscribe(paramMap => {
        const osmId: string = paramMap.get('osmId');

        this.osmId$.next(+osmId);
      });

    this.osmId$
      .pipe(takeUntil(this.destroy$))
      .pipe(mergeMap(osmId => this.nominatim.reverse(osmId)))
      .subscribe(address => {
        this.address$.next(address);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();

    this.osmId$.unsubscribe();
  }

  private initialiseState(): void {
    this.address$.next(null);
  }

}
