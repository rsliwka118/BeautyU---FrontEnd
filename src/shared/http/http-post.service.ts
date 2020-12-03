import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { getString } from "@nativescript/core/application-settings";

@Injectable()
export class HttpPostService {

    constructor(private http: HttpClient) { }

    postData(url: string, data: any, auth: boolean) {
        let options = this.createRequestOptions(auth);
        return this.http.post(url, { data }, { headers: options });
    }

    private createRequestOptions( auth: boolean ) {
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