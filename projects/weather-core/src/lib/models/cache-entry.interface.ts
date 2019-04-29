import {HttpRequest, HttpEvent} from "@angular/common/http";

export interface ICacheEntry {
  request: HttpRequest<any>;
  event: HttpEvent<any>;
  time: number;
}
