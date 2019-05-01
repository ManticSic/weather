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

  private static CACHE_LS_KEY: string = "weather.core.cache";

  private cache: Map<string, ICacheEntry>;

  constructor(
    @Inject(MODULE_CONFIG) private moduleConfig: IModuleConfig
  ) {
    this.cache = this.load();

    // todo let entries delete itself
    interval(this.moduleConfig.cache.cleanupInterval)
      .subscribe(x => {
        this.deleteExpired();
      });
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const entry: ICacheEntry | null = this.cache.get(req.urlWithParams);

    if (!!entry && !this.isExpired(entry)) {
      return of(new HttpResponse({body: entry.response.body}));
    }

    return next.handle(req)
      .pipe(tap(response => {
        this.put(req, response as HttpResponse<any>);
      }));
  }

  private put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const entry: ICacheEntry = {
      request: req,
      response: response,
      time: Date.now()
    };
    this.cache.set(req.urlWithParams, entry);

    this.save();
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

  private save(): void {
    localStorage.setItem(CachingService.CACHE_LS_KEY, JSON.stringify(Array.from(this.cache)));
  }

  private load(): Map<string, ICacheEntry> {
    const lsData: string | null = localStorage.getItem(CachingService.CACHE_LS_KEY);

    if (lsData === null) {
      return new Map<string, ICacheEntry>();
    }

    try {
      return new Map<string, ICacheEntry>(JSON.parse(lsData));
    } catch (e) {
      console.warn('Failed to parse cache data from local storage', e);
      return new Map<string, ICacheEntry>();
    }
  }
}
