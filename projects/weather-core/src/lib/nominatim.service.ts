import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NominatimService {

  private static BASE_URL = 'https://nominatim.openstreetmap.org/search';

  constructor(
    private http: HttpClient
  ) {
  }

  public search(query: string): Observable<any> {
    const params: Map<string, string> = this.getParams(query);

    return this.http.get(this.buildUrl(NominatimService.BASE_URL, params));
  }

  private getParams(query: string): Map<string, string> {
    const params: Map<string, string> = new Map<string, string>();

    params.set('format', 'jsonv2'); // todo compare jsonv2 and json
    params.set('q', encodeURIComponent(query));
    params.set('limit', '10');
    params.set('namedetails', '1');
    params.set('addressdetails', '1');

    //  https://nominatim.openstreetmap.org/search?format=jsonv2&q=Northeim&limit=10&namedetails=1&addressdetails=1&

    return params;
  }

  private buildUrl(url: string, params: Map<string, string>): string {
    let paramsAsString: string = '';

    params.forEach((v, k) => {
      paramsAsString += k + '=' + v;
      paramsAsString += '&';
    });

    return `${url}?${paramsAsString}`;
  }
}
