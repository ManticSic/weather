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

  public reverse(osmId: number): Observable<ILocation> {
    return this.getLocationFromNominatim(this.buildReverseUrl(osmId, 'R'));
  }

  private getLocationFromNominatim(url: string): Observable<ILocation> {
    return this.http.get<IOpenStreetMapFormat>(url)
      .pipe(map(osmObject => {
        return {
          lat: +osmObject.lat,
          lon: +osmObject.lon,
          city: osmObject.address.city,
          country: osmObject.address.country,
          state: osmObject.address.state,
          osmId: osmObject.osm_id
        };
      }));
  }

  private buildReverseUrl(osmId: number, osmType: string): string {
    return `${this.baseUrl}/reverse?osm_id=${osmId}&osm_type=${osmType}&format=json`;
  }

  private buildSearchUrl(query: string): string {
    return `${this.baseUrl}/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1}`
  }

}
