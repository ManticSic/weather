import {Injectable} from '@angular/core';
import {ILocation} from "./models/location.interface";

@Injectable({
  providedIn: 'root'
})
export class NominatimService {
  constructor(
  ) {
  }

  public search(query: string): Observable<ILocation> {
    throw new Error('Not implemented yet');
  }

  public reverse(lat: number, long: number): Observable<ILocation> {
    throw new Error('Not implemented yet');
  }
}
