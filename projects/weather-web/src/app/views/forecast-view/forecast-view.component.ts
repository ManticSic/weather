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

  private coordinates$: AsyncSubject<ILatLon> = new AsyncSubject();
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
        const latParamValue: string = paramMap.get('lat');
        const lonParamValue: string = paramMap.get('lon');

        const latValue: number = +latParamValue;
        const lonValue: number = +lonParamValue;

        this.coordinates$.next({
          lat: latValue,
          lon: lonValue,
        });

        this.coordinates$.complete();
      });

    this.coordinates$
      .pipe(takeUntil(this.destroy$))
      .pipe(mergeMap(latLon => this.nominatim.reverse(latLon.lat, latLon.lon)))
      .subscribe(address => {
        this.address$.next(address);
        this.address$.complete();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();

    this.coordinates$.unsubscribe();
  }

}
