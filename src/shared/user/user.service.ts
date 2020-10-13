import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { User } from "./user.model";
import { Config } from "../config";

@Injectable()
export class UserService {
    constructor( private http: HttpClient ) { }

    login(user: User) {
        return this.http.post(
            Config.apiURL + "/login",
            JSON.stringify({
                username: user.email,
                password: user.password
            }),
            { headers: this.getCommonheaders() }
        ).pipe(
            tap(data => {
                Config.token = (<any>data)._kmd.authtoken
            }),
            catchError(this.handleErrors)
        );
    }

    register() {}

    getCommonheaders() {
        return {
            "Content-Type": "application/json",
            "Authotization": Config.authHeader
        }
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error));
        return throwError(error);
    }
}
