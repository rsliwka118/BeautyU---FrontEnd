import { Injectable } from "@angular/core";
import { getString } from "@nativescript/core/application-settings";
import { Config } from "../config";
import { HttpPostService } from "../http/http-post.service";
import { ToastsService } from "../toasts.service";
import { City } from "./location.model"

@Injectable({
    providedIn: "root"
})
export class LocationService {

    constructor(private toast: ToastsService, private postService: HttpPostService) {}
    
    cities: Array<City>
    currentCity: string

    getCities(){
        this.postService
      .postData(Config.apiAuthURL + "/details", { userID: getString("userID") }, true)
      .subscribe(res => {
        
        let result = (<any>res)
        this.cities = result.cities
       
      }, error => { 
        console.log(error)
      })
    }
}
