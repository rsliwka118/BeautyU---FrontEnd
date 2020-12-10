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
import { AuthService } from '../../shared/auth/auth.service'
import { UserService } from "../user/user.service";

@Injectable({
  providedIn: "root"
})
export class AccountService {
    
    message: string
    isLoggingIn = true

    constructor(
      private zone: NgZone, 
      private routerExtension: RouterExtensions, 
      private toast: ToastsService,
      private postService: HttpPostService,
      private getService: HttpGetService,
      private deleteService: HttpDeleteService,
      private userService: UserService,
      private auth: AuthService
      ) {}

    login() {
      this.postService
      .postData(Config.apiAuthURL + "/login", { email: this.userService.user.email, password: this.userService.user.password }, false)
      .subscribe(res => {
        
        let result = (<any>res)

        setString("userID", result.id)
        setString("accessToken", result.accessToken)
        setString("refreshToken", result.refreshToken)
        
        this.toast.showToast('Zalogowano pomyślnie!')
  
        this.auth.isAuthorized = true

        this.auth.getDetails(false)

      }, error => {
        this.toast.showToast(error.error) 
      })
      
    }

    register() {
      this.postService
      .postData(Config.apiAuthURL + "/register", 
        {
          accountType: "Client",
          email: this.userService.user.email,
          firstName: this.userService.user.firstName,
          lastName: this.userService.user.lastName,
          password: this.userService.user.password
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
  
          this.auth.isAuthorized = false

          this.routerExtension.navigate(['/login'], { clearHistory: true })
                           
          this.userService.user.email = ""
          this.userService.user.firstName = ""
          this.userService.user.lastName = ""
          this.userService.user.password = ""

          clear()  
      }, error => {
        this.toast.showToast(error.error)   
      })
        
    }
  }