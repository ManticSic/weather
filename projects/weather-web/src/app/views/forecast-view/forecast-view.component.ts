import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AsyncSubject, Subject} from "rxjs";
import {mergeMap, takeUntil} from "rxjs/operators";
import {ILatLon} from "../../models/lat-lon.interface";
import {NominatimService, ILocation} from "weather-core";

@Component({
  selector: 'weather-web-forecast-view',
  templateUrl: './forecast-view.component.html',
  styleUrls: ['./forecast-view.component.scss']
})
export class ForecastViewComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject();

  private osmId: AsyncSubject<number> = new AsyncSubject();
  private address$: AsyncSubject<ILocation> = new AsyncSubject();

  constructor(
    private route: ActivatedRoute,
    private nominatim: NominatimService,
  ) {
  }

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(paramMap => {
        const osmId: string = paramMap.get('osmId');

        this.osmId.next(+osmId);
        this.osmId.complete();
      });

    this.osmId
      .pipe(takeUntil(this.destroy$))
      .pipe(mergeMap(osmId => this.nominatim.reverse(osmId)))
      .subscribe(address => {
        this.address$.next(address);
        this.address$.complete();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();

    this.osmId.unsubscribe();
  }

}
