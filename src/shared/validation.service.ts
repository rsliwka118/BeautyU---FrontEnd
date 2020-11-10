import { Injectable } from "@angular/core";

const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

@Injectable()
export class ValidationService {

    public isValidEmail(email: string) {
        if(!email)
            return false;

        return regexp.test(email)
    }


}