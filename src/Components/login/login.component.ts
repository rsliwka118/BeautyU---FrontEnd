import { Component, OnInit } from '@angular/core'
import { isAndroid } from "@nativescript/core/platform"
import { Page } from "@nativescript/core/ui/page"
import { UserService } from '../../shared/user/user.service'

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  isLoggingIn = true
  
  constructor(private page: Page, public User: UserService) {}

  ngOnInit(): void{
    this.page.actionBarHidden = true
  }

  toggleForm() {
    this.isLoggingIn = !this.isLoggingIn
  }

  submit(){
    if(this.isLoggingIn){
      this.User.login()
    } else {
      this.User.register()
    }
  }

}
