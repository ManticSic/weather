import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AsyncSubject, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {ILatLon} from "../../models/lat-lon.interface";

@Component({
  selector: 'weather-web-forecast-view',
  templateUrl: './forecast-view.component.html',
  styleUrls: ['./forecast-view.component.scss']
})
export class ForecastViewComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject();

  private coordinates$: AsyncSubject<ILatLon> = new AsyncSubject();

  constructor(
    private route: ActivatedRoute,
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
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
