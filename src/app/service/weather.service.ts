import { Injectable } from '@angular/core';
import { Observable, of, interval } from 'rxjs';
import { map, zip, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() { }

  public getCurrentTemperature(): Observable<number> {
    return of(28, 23, 18, 32).pipe(zip(interval(5000)), map(x => x[0]));
  }

  public search(query: string): Observable<string> {
    return of(`Search result of ${query}`).pipe(delay((Math.random() + 1) * 10000));
  }
}
