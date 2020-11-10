import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { User } from "./user.model";
import { Config } from "../config";

@Injectable()
export class UserService {

    user: User

    constructor( private http: HttpClient ) { 
        this.user = new User()
        this.user.email = ""
        this.user.password = ""
        this.user.firstName = ""
        this.user.lastName = ""
    }

    hasEmail() {
        return this.user.email != '';
    }

    // login() {
    //     return this.http.post(
    //         Config.apiAuthURL + "/login",
    //         JSON.stringify({
    //             username: this.user.email,
    //             password: this.user.password
    //         }),
    //         { headers: this.getCommonheaders() }
    //     ).pipe(
    //         tap(data => {
    //             Config.token = (<any>data)._kmd.authtoken
    //         }),
    //         catchError(this.handleErrors)
    //     );
    // }
    login(){}

    register(){
        fetch(Config.apiAuthURL + "/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                accountType: "Client",
                email: this.user.email,
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                password: this.user.password
            })
        }).then((r) => r.json())
            .then((response) => {
                const result = response.json;
            }).catch((e) => {});
    }

    // handleErrors(error: Response) {
    //     console.log(JSON.stringify(error));
    //     return throwError(error);
    // }
}
