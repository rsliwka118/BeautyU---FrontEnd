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
      private postService: HttpPostService,
      private getService: HttpGetService,
      private deleteService: HttpDeleteService
      ) {}

    async getDetails(checkToken) {
      
      console.log("2 " +getString("accessToken"))
      this.postService
      .postData(Config.apiAuthURL + "/details", { userID: getString("userID") }, true)
      .subscribe(res => {
        console.log("details done")
        let result = (<any>res)
        this.isAuthorized = true
        this.userService.user.firstName = result.firstName
        this.userService.user.lastName = result.lastName

        this.zone.run(() => {
        this.routerExtension.navigate(['/menu'], { clearHistory: true })
        })
      }, error => { 
        console.log("details error")
          this.toast.showToast('Twoja sesja wygasła')
          this.isAuthorized = false
          this.zone.run(() => {
            this.routerExtension.navigate(['/login'], { clearHistory: true })
          })
      })
  
    }      

    // async checkToken() {
    //   this.getService
    //   .getData(Config.apiAuthURL + "/checktoken", true)
    //   .subscribe(res => {
    //     console.log("check done")
    //     //this.hasExpired = false
    //   }, error => {
    //     console.log("check refresh")
    //     //this.hasExpired = true
    //     //this.refreshToken()
    //   })
    // }

    // async refreshToken() { 
    //   this.postService
    //   .postData(Config.apiAuthURL + "/token", {token: getString("refreshToken")}, false)
    //   .subscribe(res => {
    //     let result = (<any>res)
    //     console.log("refresh done "+result.accessToken)
    //     setString("accessToken", result.accessToken)
    //   }, error => {
    //     console.log("refresh denied")
    //     this.isAuthorized = false
    //     this.routerExtension.navigate(['/login'], { clearHistory: true })
    //   })
    // }
  }