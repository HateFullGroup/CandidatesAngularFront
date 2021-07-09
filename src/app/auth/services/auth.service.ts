import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../../shared/interfaces";
import {Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, mapTo, tap} from "rxjs/operators";
import {config} from "../../config";
import {Tokens} from "../modelds/tokens";
@Injectable()

export class AuthService {

  // private http!: HttpClient

    private readonly ACCESS_TOKEN = 'JWT_TOKEN';
    private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
    private loggedUser?: string | null;

    constructor(private http: HttpClient) {}

    login(user: User): Observable<boolean> {
        return this.http.post<any>(`${config.apiUrl}/token/`, user)
            .pipe(
                tap(tokens => this.doLoginUser(user.username, tokens)),
                mapTo(true),
                catchError(error => {
                    alert(error.error);
                    return of(false);
                }));
    }

    logout() {
        // return this.http.post<any>(`${config.apiUrl}/logout`, {
        //     'refreshToken': this.getRefreshToken()
        // }).pipe(
        //     tap(() => this.doLogoutUser()),
        //     mapTo(true),
        //     catchError(error => {
        //         alert(error.error);
        //         return of(false);
        //     }));
        this.doLogoutUser()
    }

    isLoggedIn() {
        return !!this.getJwtToken();
    }

    refreshToken() {
        return this.http.post<any>(`${config.apiUrl}/token/refresh/`, {
            'refresh': this.getRefreshToken()
        }).pipe(tap((tokens: Tokens) => {
            this.storeJwtToken(tokens.access);
        }));
    }

    getJwtToken() {
        return localStorage.getItem(this.ACCESS_TOKEN);
    }

    private doLoginUser(username: string, tokens: Tokens) {
        this.loggedUser = username;
        this.storeTokens(tokens);
    }

    private doLogoutUser() {
        this.loggedUser = null;
        this.removeTokens();
    }

    private getRefreshToken() {
        return localStorage.getItem(this.REFRESH_TOKEN);
    }

    private storeJwtToken(jwt: string) {
        localStorage.setItem(this.ACCESS_TOKEN, jwt);
    }

    private storeTokens(tokens: Tokens) {
        localStorage.setItem(this.ACCESS_TOKEN, tokens.access);
        localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh);
    }

    private removeTokens() {
        localStorage.removeItem(this.ACCESS_TOKEN);
        localStorage.removeItem(this.REFRESH_TOKEN);
    }


}
