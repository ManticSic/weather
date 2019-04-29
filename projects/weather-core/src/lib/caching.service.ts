import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {ICacheEntry} from "./models/cache-entry.interface";
import {IModuleConfig} from "./models/module-config.interface";
import {MODULE_CONFIG} from "./tokens/module-config.token";
import {interval, Observable, of} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CachingService implements HttpInterceptor {

  private cache: Map<string, ICacheEntry> = new Map<string, ICacheEntry>();

  constructor(
    @Inject(MODULE_CONFIG) private moduleConfig: IModuleConfig
  ) {
    // todo let entries delet themself
    interval(this.moduleConfig.cache.cleanupInterval)
      .subscribe(x => {
        this.deleteExpired();
      });
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const entry: ICacheEntry | null = this.cache.get(req.urlWithParams);

    if (entry && !this.isExpired(entry)) {
      of(entry);
    }

    return next.handle(req)
      .pipe(tap(event => {
        this.put(req, event);
      }));
  }

  private put(req: HttpRequest<any>, event: HttpEvent<any>): void {
    const entry: ICacheEntry = {
      request: req,
      event: event,
      time: Date.now()
    };
    this.cache.set(req.urlWithParams, entry);
  }

  private clear(entry: ICacheEntry): void {
    this.cache.delete(entry.request.urlWithParams);
  }

  private deleteExpired(): void {
    this.cache.forEach((v, k) => {
      if (this.isExpired(v)) {
        this.clear(v);
      }
    });
  }

  private isExpired(entry: ICacheEntry): boolean {
    const currentTime: number = Date.now();
    return (currentTime - entry.time) > this.moduleConfig.cache.maxAge
  }
}
