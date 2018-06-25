import * as fromLogin from './login.action';

export interface LoginState {
    username: string;
    token: string;
}

export function reducer(state: LoginState, action: fromLogin.LoginActions): LoginState {
    switch(action.type) {
        case fromLogin.ACTION_LOGIN_SUCCESSFUL: {
            return {
                username: action.payload.username,
                token: (action as fromLogin.LoginSuccessfulAction).payload.token,
            }
        }
        default: return state;
    }
}