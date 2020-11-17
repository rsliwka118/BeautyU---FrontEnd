import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { Page } from "@nativescript/core/ui/page"
import { User } from "../../shared/user/user.model"
import { Config } from "../../shared/config"
import { ValidationService } from '../../shared/validation.service'
import { ToastsService } from '../../shared/toasts.service'
import { AuthService } from '../../shared/auth.service'
import { RouterExtensions } from '@nativescript/angular'
import { NgZone } from '@angular/core'

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  confirmPassword = ""
  emailError = ""
  loginError = ""
  passwordError = ""
  confirmPasswordError = ""
  firstNameError = ""
  lastNameError = ""

  emailFocus = false
  passwordFocus = false
  firstNameFocus = false
  lastNameFocus = false
  confirmPasswordFocus = false
 

  constructor(public auth: AuthService, private page: Page, public validService: ValidationService, public toast: ToastsService) {
  
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true
  }

  toggleForm() {
    this.auth.user.email = ""
    this.auth.user.firstName = ""
    this.auth.user.lastName = ""
    this.auth.user.password = ""
    this.confirmPassword = ""
    this.passwordError = ""
    this.firstNameError = ""
    this.lastNameError = ""
    this.confirmPasswordError = ""

    this.auth.isLoggingIn = !this.auth.isLoggingIn
  }

  public emailErrors() {

    const errorMsg = !!this.emailError
    if (!errorMsg) return false

    const isValidEmail = this.auth.user.hasEmail() && this.validService.isValidEmail(this.auth.user.email)
    let error = errorMsg || !isValidEmail

    if (isValidEmail) {

      this.emailError = ""
      return false

    }
    return error
  }

  public passwordErrors() {
    const errorMsg = !!this.passwordError
    if (!errorMsg) return false

    const isValidPassword = this.auth.user.password.length > 0 && this.validService.isValidPassword(this.auth.user.password)
    let error = errorMsg || !isValidPassword

    if (isValidPassword) {
      this.passwordError = ""
      return false
    }
    return error
  }

  public confirmErrors() {
    const errorMsg = !!this.confirmPasswordError
    if (!errorMsg) return false

    const isValidConfirm = this.confirmPassword.length > 0 && this.validService.isValidConfirm(this.confirmPassword, this.auth.user.password)
    let error = errorMsg || !isValidConfirm

    if (isValidConfirm) {

      this.confirmPasswordError = ""
      return false

    }
    return error
  }

  public firstNameErrors() {
    const errorMsg = !!this.firstNameError
    if (!errorMsg) return false

    const isValidFirstName = this.auth.user.firstName.length > 0
    let error = errorMsg || !isValidFirstName

    if (isValidFirstName) {

      this.firstNameError = ""
      return false

    }
    return error
  }

  public lastNameErrors() {
    const errorMsg = !!this.lastNameError
    if (!errorMsg) return false

    const isValidLastName = this.auth.user.lastName.length > 0
    let error = errorMsg || !isValidLastName

    if (isValidLastName) {

      this.firstNameError = ""
      return false

    }
    return error
  }

  updateErrors(checkPassword, checkConfirm) {

    this.firstNameError = this.auth.user.hasFirstName() ? "" : "Podaj imię"
    this.lastNameError = this.auth.user.hasLastName() ? "" : "Podaj nazwisko"

    if (this.auth.user.hasEmail()) {
      if (this.validService.isValidEmail(this.auth.user.email)) {
        this.emailError = "";
      } else {
        this.emailError = "Nieprawidłowy email"
      }
    } else {
      this.emailError = "Email nie może być pusty"
    }

    if (checkPassword) {
      let lengthPass = this.auth.user.password.length

      if (lengthPass != 0) {
        if (this.validService.isValidPassword(this.auth.user.password)) {
          this.passwordError = ""
        } else {
          this.passwordError = this.auth.isLoggingIn ? "Nieprawidłowe hasło" : "8-20 znaków, 1 duża litera, 1 znak specjalny"
        }
      } else {
        this.passwordError = "Hasło nie może być puste"
      }
      if (checkConfirm) {
        let lengthConf = this.confirmPassword.length

        if (lengthConf != 0) {
          if (this.validService.isValidConfirm(this.confirmPassword, this.auth.user.password)) {
            this.confirmPasswordError = ""
          } else {
            this.confirmPasswordError = "Hasła są różne"
          }
        } else {
          this.confirmPasswordError = "Potwierdź swoje hasło"
        }
      }
    }
  }
  private isValidForm() {
    let isValid

    if (!this.auth.isLoggingIn) {
      isValid = !!this.emailError || !!this.passwordError || !!this.firstNameError || !!this.lastNameError || !!this.confirmPasswordError;
    } else {
      isValid = !!this.emailError || !!this.passwordError
    }
    return !isValid;
  }

  getEmailError() {
    return this.emailError
  }

  getFirstNameError() {
    return this.firstNameError
  }

  getLastNameError() {
    return this.lastNameError
  }

  getPasswordError() {
    return this.passwordError
  }

  getConfirmPasswordError() {
    return this.confirmPasswordError
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
    this.updateErrors(false, false);
  }

  onConfirmFocus() {
    this.confirmPasswordFocus = true;
    this.updateErrors(false, false);
  }

  isSubmitEnabled() {
    return this.validService.isValidEmail(this.auth.user.email);
  }

  submit() {
    if(this.isValidForm()){
      if (this.auth.isLoggingIn) {
        this.updateErrors(true, false);
        this.auth.login()
      } else {
        this.updateErrors(true, true);
        this.auth.register()
      }
    }
  }

}
