import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { getString } from "@nativescript/core/application-settings";

@Injectable()
export class HttpDeleteService {

    constructor(private http: HttpClient) { }

    deleteData(url: string, logout: boolean) {
        let headers = this.createRequestHeader(logout);
        return this.http.delete(url, { headers: headers });
    }

    private createRequestHeader(logout: boolean) {

        let headers: HttpHeaders
        
        if(logout){
        headers = new HttpHeaders({
            "Content-Type": "application/json",
            "authorization": getString("refreshToken")
        });
        } else {
            headers = new HttpHeaders({
                "Content-Type": "application/json",
                "authorization": getString("accessToken")
            }); 
        };

        return headers;
    }
}