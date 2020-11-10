import { Component, OnInit } from '@angular/core'
import { Page } from "@nativescript/core/ui/page"
import { User } from "../../shared/user/user.model";
import { Config } from "../../shared/config";
import { ValidationService } from '../../shared/validation.service'
@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user: User
  
  isLoggingIn = true
  emailError = ""
  loginError = ""
  passwordError = ""
  confirmPasswordError = ""
  firstNameError = ""
  lastNameError = ""
 
  emailFocus = false;
  passwordFocus = false;
  firstNameFocus = false;
  lastNameFocus = false;
  confirmPasswordFocus = false;
  isAuthenticating = false;

  constructor(private page: Page, public validService: ValidationService) {
    this.user = new User()
        this.user.email = ""
        this.user.password = ""
        this.user.firstName = ""
        this.user.lastName = ""
  }

  ngOnInit(): void{
    this.page.actionBarHidden = true
  }

  toggleForm() {
    this.isLoggingIn = !this.isLoggingIn
  }

  public emailErrors(){
        
    const errorMsg = !! this.emailError
    if(!errorMsg) return false

    const isValidEmail = this.user.hasEmail() && this.validService.isValidEmail(this.user.email)
    let error = errorMsg || !isValidEmail

    if(isValidEmail){

      this.emailError = ""
      return false

    }

    return error
  }

  public passwordErrors(){
    const errorMsg = !! this.passwordError
    if(!errorMsg) return false

    const isValidPassword = this.user.password.length > 0
    let error = errorMsg || !isValidPassword

    if(isValidPassword){

      this.passwordError = ""
      return false

    }
    return error
  }

  public firstNameErrors(){
    const errorMsg = !! this.firstNameError
    if(!errorMsg) return false

    const isValidFirstName = this.user.firstName.length > 0
    let error = errorMsg || !isValidFirstName

    if(isValidFirstName){

      this.firstNameError = ""
      return false

    }
    return error
  }

  public lastNameErrors(){
    const errorMsg = !! this.lastNameError
    if(!errorMsg) return false

    const isValidLastName = this.user.lastName.length > 0
    let error = errorMsg || !isValidLastName

    if(isValidLastName){

      this.firstNameError = ""
      return false

    }
    return error
  }

  updateErrors(checkPassword) {

    this.firstNameError = this.user.hasFirstName() ? "" : "Podaj imię"
    this.lastNameError = this.user.hasLastName() ? "" : "Podaj nazwisko"

    if (this.user.hasEmail()) {
      if (this.validService.isValidEmail(this.user.email)) {
          this.emailError = "";
      } else {
          this.emailError = "Nieprawidłowy email"
      }
    } else {
        this.emailError = "Email nie może być pusty"
    }

    if (checkPassword) {
        let length = this.user.password.length;
        if (length == 0) {
            this.passwordError = "Hasło nie może być puste";
        } else {
            this.passwordError = "";
        }
    }
  }


  private isValidForm() {
    let isValid = !!this.emailError || !!this.passwordError;
    return !isValid;
    }

  getEmailError(){
    return this.emailError
  }
  
  getFirstNameError(){
    return this.firstNameError
  }
  
  getLastNameError(){
    return this.lastNameError
  }

  getPasswordError(){
    return this.passwordError
  }

  onEmailFocus() {
      this.emailFocus = true;
  }

  onFirstNameFocus() {
    this.firstNameFocus = true;
  }

  onLastNameFocus() {
    this.lastNameFocus = true;
  }

  onPasswordFocus() {
      this.passwordFocus = true;
      this.updateErrors(false);
  }

  isSubmitEnabled() {
    return !this.isAuthenticating && this.validService.isValidEmail(this.user.email);
  }

  submit(){
    if(this.isLoggingIn){
      this.login()
    } else {
      this.register()
    }
  }

  login(){}

  register(){
    this.updateErrors(true);

    if(this.isValidForm()){
      fetch(Config.apiAuthURL + "/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              accountType: "Client",
              email: this.user.email,
              firstName: this.user.firstName,
              lastName: this.user.lastName,
              password: this.user.password
          })
      }).then((r) => r.json())
          .then((response) => {
              const result = response.json;
              this.isAuthenticating = false;
              this.isLoggingIn = false;
          }).catch((e) => {
            this.isAuthenticating = false;
          });
    }      
  }

}
