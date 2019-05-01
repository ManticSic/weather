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
    return this.getLocationFromNominatim(this.buildSearchUrl(query));
  }

  public reverse(lat: number, lon: number): Observable<ILocation> {
    return this.getLocationFromNominatim(this.buildReverseUrl(lat, lon));
  }

  private getLocationFromNominatim(url: string): Observable<ILocation> {
    return this.http.get<IOpenStreetMapFormat>(url)
      .pipe(map(osmObject => {
        return {
          lat: +osmObject.lat,
          lon: +osmObject.lon,
          city: osmObject.address.town,
          country: osmObject.address.country,
          state: osmObject.address.state,
        };
      }));
  }

  private buildReverseUrl(lat: number, lon: number): string {
    return `${this.baseUrl}/reverse?lat=${lat}&lon=${lon}&format=json`;
  }

  private buildSearchUrl(query: string): string {
    return `${this.baseUrl}/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1}`
  }

}
