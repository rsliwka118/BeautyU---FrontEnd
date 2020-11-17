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

}
