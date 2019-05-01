import {Injectable} from '@angular/core';
import {ILocation} from "./models/location.interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IOpenStreetMapFormat} from "./models/open-street-map-format.interface";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NominatimService {
  private baseUrl: string = 'https://nominatim.openstreetmap.org';

  constructor(
    private http: HttpClient,
  ) {
  }

  public search(query: string): Observable<ILocation> {
    throw new Error('Not implemented yet');
  }

  public reverse(lat: number, lon: number): Observable<ILocation> {
    return this.http.get<IOpenStreetMapFormat>(this.buildReverseUrl(lat, lon))
      .pipe(map(osmObject => {
        return {
          lat: +osmObject.lat,
          lon: +osmObject.lon,
          city: osmObject.address.town,
          country: osmObject.address.country
        };
      }));
  }

  private buildReverseUrl(lat: number, lon: number): string {
    return `${this.baseUrl}?lat=${lat}&lon=${lon}&format=json`;
  }


}
