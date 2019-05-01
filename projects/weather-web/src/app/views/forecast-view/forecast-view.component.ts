import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'weather-web-forecast-view',
  templateUrl: './forecast-view.component.html',
  styleUrls: ['./forecast-view.component.scss']
})
export class ForecastViewComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject();

  constructor(
    private route: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(paramMap => {
        const latParamValue: string = paramMap.get('lat');
        const longParamValue: string = paramMap.get('long');

        const letValue: number = +latParamValue;
        const longValue: number = +longParamValue;

        // todo nominatim reverse
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
