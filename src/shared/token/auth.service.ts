import { Injectable } from "@angular/core";
import { User } from "../user/user.model";

@Injectable()
export class AuthService {
    
    constructor(){}

    public getNewToken(user: User){}
}