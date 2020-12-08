import { Injectable, NgZone } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { getBoolean, setBoolean,  getNumber, setNumber, getString, setString, hasKey, remove, clear} from "@nativescript/core/application-settings";
import { ToastsService } from "../toasts.service";
import { Config } from "../config"
import { HttpPostService } from "../http/http-post.service";
import { tap } from "rxjs/operators";
import { HttpGetService } from "../http/http-get.service";
import { HttpDeleteService } from "../http/http-delete.service";
import { UserService } from "../user/user.service";
import { SalonService } from "../salon/salon.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
    
    isAuthorized: boolean
    hasExpired: boolean

    constructor(
      private zone: NgZone,
      private userService: UserService, 
      private routerExtension: RouterExtensions, 
      private toast: ToastsService,
      private salon: SalonService,
      private postService: HttpPostService,
      private getService: HttpGetService,
      private deleteService: HttpDeleteService
      ) {}

    getDetails(checkToken) {

      this.postService
      .postData(Config.apiAuthURL + "/details", { userID: getString("userID") }, true)
      .subscribe(res => {
        let fav: any
        let result = (<any>res)

        this.isAuthorized = true
        this.userService.user.firstName = result.user.firstName
        this.userService.user.lastName = result.user.lastName
        fav = result.favorites
        this.salon.createFavArray(fav)

        this.zone.run(() => {
        this.routerExtension.navigate(['/menu'], { clearHistory: true })
        })
      }, error => { 
        console.log(error)
      })
  
    }      

    refreshToken(){
  
      return this.postService
      .postData(Config.apiAuthURL + "/token", {token: getString("refreshToken")}, false)
     
  }
    getToken() {
      return getString("accessToken")
    }

    setToken(token) {
      setString("accessToken", token)
    }

}