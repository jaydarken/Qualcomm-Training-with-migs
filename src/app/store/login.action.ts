import { Action } from '@ngrx/store';

export const ACTION_LOGIN = '[Login] Login';
export const ACTION_LOGIN_SUCCESSFUL = '[Login] Login Successful'; 

export class LoginAction implements Action {
    public type = ACTION_LOGIN;
    constructor(public payload: {username: string, password: string}) {}
}

export class LoginSuccessfulAction implements Action {
    public type = ACTION_LOGIN_SUCCESSFUL;
    constructor(public payload: { username: string, token: string}) {}
}

export type LoginActions = LoginAction | LoginSuccessfulAction;
