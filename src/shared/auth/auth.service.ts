import { Injectable, NgZone } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { getBoolean, setBoolean,  getNumber, setNumber, getString, setString, hasKey, remove, clear} from "@nativescript/core/application-settings";
import { ToastsService } from "../toasts.service";
import { User } from "../user/user.model";
import { Config } from "../config"
import { HttpPostService } from "../http/http-post.service";
import { tap } from "rxjs/operators";
import { HttpGetService } from "../http/http-get.service";
import { HttpDeleteService } from "../http/http-delete.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
    
    user: User
    message: string
    isLoggingIn = true
    isAuthorized: boolean
    hasExpired: boolean

    constructor(
      private zone: NgZone, 
      private routerExtension: RouterExtensions, 
      private toast: ToastsService,
      private postService: HttpPostService,
      private getService: HttpGetService,
      private deleteService: HttpDeleteService
      ) {
        this.user = new User()
        this.user.email = "front@mail.com"
        this.user.password = ""
        this.user.firstName = ""
        this.user.lastName = ""
    }

    login() {
      this.postService
      .postData(Config.apiAuthURL + "/login", { email: this.user.email, password: this.user.password }, false)
      .subscribe(res => {
        
        let result = (<any>res)

        setString("userID", result.id)
        setString("accessToken", result.accessToken)
        setString("refreshToken", result.refreshToken)
        
        this.toast.showToast('Zalogowano pomyślnie!')
  
        this.isAuthorized = true

        this.getDetails(false)
        this.zone.run(() => {
          this.routerExtension.navigate(['/menu'], { clearHistory: true })
        })

      }, error => {
        this.toast.showToast(error.error) 
      })
      
    }

    register() {
      this.postService
      .postData(Config.apiAuthURL + "/register", 
        {
          accountType: "Client",
          email: this.user.email,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          password: this.user.password
        }, false)
      .subscribe(res => {
         
          this.toast.showToast('Zarejestrowano pomyślnie!')
          this.isLoggingIn = true
         
        }, error => {
          this.toast.showToast(error.error)   
        })
    }

    logout(){
      this.deleteService
      .deleteData(Config.apiAuthURL + "/logout", true)
      .subscribe(res => {

          this.toast.showToast('Wylogowano')  
          this.isAuthorized = false

          this.routerExtension.navigate(['/login'], { clearHistory: true })
                           
          this.user.email = ""
          this.user.firstName = ""
          this.user.lastName = ""
          this.user.password = ""

          clear()  
      }, error => {
        this.toast.showToast(error.error)   
      })
        
    }

    //FETCH will be changed to http 
    async getDetails(checkToken) {
      if(checkToken){
        await this.checkToken()
      }
      const res = await fetch(Config.apiAuthURL + "/details", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "authorization": getString("accessToken")
        },
        body: JSON.stringify({
          data: {
            userID: getString("userID"),
          }
        })
      })

      if (res.status == 200) {
        this.isAuthorized = true
        const content = await res.json()

        this.user.firstName = content.firstName
        this.user.lastName = content.lastName

        this.zone.run(() => {
        this.routerExtension.navigate(['/menu'], { clearHistory: true })
        })
      } else if(res.status == 403) {
          this.toast.showToast('Twoja sesja wygasła')
          this.isAuthorized = false
          this.zone.run(() => {
          this.routerExtension.navigate(['/login'], { clearHistory: true })
        })
      }
    } 

    async checkToken() {
      const res = await fetch(Config.apiAuthURL + "/checktoken", {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "authorization": getString("accessToken")
        }
      })
      if(res.status != 200)
        await this.refreshToken()
      } 

    async refreshToken() { 
      const res = await fetch(Config.apiAuthURL + "/token", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          data: {
            token: getString("refreshToken")
          }
        })
      })
      
      if(res.status == 200){
        const content = await res.json()
        setString("accessToken", content.accessToken)
      } else {
        this.isAuthorized = false
        this.routerExtension.navigate(['/login'], { clearHistory: true })
      }
    }
    
    // Fetch to HTTP. async problem

    // async getDetails(checkToken) {
      
    //   console.log("1 " +getString("accessToken"))
      
    //   await this.refreshToken()
    //   console.log("2 " +getString("accessToken"))
    //   this.details()
      
  
    // }      

    // details(){
    //   console.log("2 " +getString("accessToken"))
    //   this.postService
    //   .postData(Config.apiAuthURL + "/details", { userID: getString("userID") }, true)
    //   .subscribe(res => {
    //     console.log("details done")
    //     let result = (<any>res)
    //     this.isAuthorized = true
    //     this.user.firstName = result.firstName
    //     this.user.lastName = result.lastName

    //     this.zone.run(() => {
    //     this.routerExtension.navigate(['/menu'], { clearHistory: true })
    //     })
    //   }, error => { 
    //     console.log("details error")
    //       this.toast.showToast('Twoja sesja wygasła')
    //       this.isAuthorized = false
    //       this.zone.run(() => {
    //         this.routerExtension.navigate(['/login'], { clearHistory: true })
    //       })
    //   })
    // }
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