import { Injectable } from "@angular/core";

const regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
const regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)

@Injectable()
export class ValidationService {

    public isValidEmail(email: string) {
        if (!email) 
            return false

        return regexEmail.test(email)
    }

    public isValidPassword(password: string) {
        if (!password) 
            return false

        if (password.length >= 8 && password.length <= 20 && regexPassword.test(password)){
            return true
        } else {
            return false
        }
    }
    
    public isValidConfirm(confirmPassword: string, password: string) {
        if (!confirmPassword || !password) 
            return false

        if (confirmPassword === password){
            return true
        } else {
            return false
        }
    }
}