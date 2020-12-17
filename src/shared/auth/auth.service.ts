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
import { LocationService } from "../location/location.service"
@Injectable({
  providedIn: "root"
})
export class AuthService {
    
    isAuthorized: boolean
    hasExpired: boolean
    isNew: number

    constructor(
      private zone: NgZone,
      private userService: UserService, 
      private routerExtension: RouterExtensions, 
      private toast: ToastsService,
      private salon: SalonService,
      private postService: HttpPostService,
      private router: RouterExtensions,
      private getService: HttpGetService,
      private deleteService: HttpDeleteService,
      private location: LocationService
      ) {}
    
    reloadComponent() {
      let currentUrl = this.router.router.url;
          this.router.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
    }

    getDetails(checkToken) {

      this.postService
      .postData(Config.apiAuthURL + "/details", { userID: getString("userID") }, true)
      .subscribe(res => {
        let fav: any
        let result = (<any>res)

        this.isAuthorized = true
        this.userService.user.firstName = result.user.firstName
        this.userService.user.lastName = result.user.lastName
        this.location.currentCity = result.user.city
        fav = result.favorites
        this.salon.createFavArray(fav)
        this.location.cities = result.cities
        this.isNew = result.user.isNew.data[0]
        setString("accountType",result.user.accountType)

        if(this.isNew){
          this.routerExtension.navigate(['/menu']);
        } else {
            this.routerExtension.navigate(['/settings'])
        }
       
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