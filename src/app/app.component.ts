import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { WeatherService } from './service/weather.service';
import { Observable, fromEvent } from 'rxjs';
import { filter, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public currentTemperature: Observable<string>;

  @ViewChild('textfield')
  public textfield: ElementRef;

  constructor(private weatherService: WeatherService) {
    this.currentTemperature = this.weatherService.getCurrentTemperature()
      .pipe(
          filter(x => x>=20),
          map(x => `${x}*c`)
      );
  }

  public ngOnInit() {
    fromEvent(this.textfield.nativeElement, 'input')
      .pipe(map(e => e.target.value), debounceTime(300), distinctUntilChanged(), switchMap(this.weatherService.search))
      .subscribe(e => console.log(e));
  }
}
