import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Actions, Effect } from "@ngrx/effects";
import {
  ACTION_LOGIN,
  LoginSuccessfulAction,
  LoginAction
} from "./login.action";
import { Observable, of } from "rxjs";
import { exhaustMap, map, tap, catchError } from "rxjs/operators";

@Injectable()
export class LoginEffects {
  constructor(public http: HttpClient, private actions$: Actions) {}

  @Effect()
  public login$: Observable<LoginSuccessfulAction> = this.actions$
    .ofType<LoginAction>(ACTION_LOGIN)
    .pipe(
      tap(e => console.log(`will login ${JSON.stringify(e)}`)),
      exhaustMap(action => {
        return this.http
          .post<{ username: string; token: string }>(
            "http://localhost/ngrx/login.php",
            action.payload
          )
          .pipe(
            map(
              response =>
                new LoginSuccessfulAction({
                  username: response.username,
                  token: response.token
                })
            ),
            catchError(e => {
              console.log(e);
              return of(new LoginSuccessfulAction({ username: "", token: "" }));
            })
          );
      })
    );
}
