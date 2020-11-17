import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class HttpPostService {

    constructor(private http: HttpClient) { }

    postData(url: string, data: any) {
        let options = this.createRequestOptions();
        return this.http.post(url, { data }, { headers: options });
    }

    private createRequestOptions() {
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        return headers;
    }
}