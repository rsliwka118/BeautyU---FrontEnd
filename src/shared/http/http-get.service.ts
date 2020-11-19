import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { getString } from "@nativescript/core/application-settings";

@Injectable()
export class HttpGetService {

    constructor(private http: HttpClient) { }

    getData(url: string, auth: boolean) {
        let headers = this.createRequestHeader(auth);
        return this.http.get(url, { headers: headers });
    }

    private createRequestHeader(auth: boolean) {

        let headers: HttpHeaders
        
        if(!auth){
        headers = new HttpHeaders({
            "Content-Type": "application/json",
        });
        } else {
            headers = new HttpHeaders({
                "Content-Type": "application/json",
                "authorization": getString("accessToken")
            }); 
        }

        return headers;
    }
}