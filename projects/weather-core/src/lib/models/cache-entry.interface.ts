import {HttpRequest, HttpResponse} from "@angular/common/http";

export interface ICacheEntry {
  request: HttpRequest<any>;
  response: HttpResponse<any>;
  time: number;
}
