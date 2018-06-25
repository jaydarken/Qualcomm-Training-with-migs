import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy
} from "@angular/core";
import { WeatherService } from "./service/weather.service";
import { Observable, fromEvent } from "rxjs";
import {
  filter,
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from "rxjs/operators";
import { Store } from "@ngrx/store";
import { LoginAction, LoginSuccessfulAction } from "./store/login.action";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public currentTemperature: Observable<string>;

  public username: string;
  public password: string;

  public hello = { hello: "world" };

  @ViewChild("textfield") public textfield: ElementRef;

  constructor(
    private weatherService: WeatherService,
    private store: Store<any>
  ) {
    this.currentTemperature = this.weatherService.getCurrentTemperature().pipe(
      filter(x => x >= 20),
      map(x => `${x}*c`)
    );

    store.select("login").subscribe(loginCredentials => {
      console.log(`[AppComponent] ${JSON.stringify(loginCredentials)}`);
    });
  }

  public ngOnInit() {
    fromEvent(this.textfield.nativeElement, "input")
      .pipe(
        map(e => ((e as KeyboardEvent).target as HTMLInputElement).value),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(this.weatherService.search)
      )
      .subscribe(e => console.log(e));
  }

  public onLogin() {
    console.log(`[AppComponent onLogin]`);
    this.store.dispatch(
      new LoginAction({ username: this.username, password: this.password })
    );
  }

  public triggerHello() {
    this.hello.hello = "123";
  }
}
