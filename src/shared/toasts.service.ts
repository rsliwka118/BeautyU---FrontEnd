import { Injectable } from "@angular/core";
import * as Toast from "nativescript-toast";

@Injectable()
export class ToastsService {

    public showToast(message: string) {
        Toast.makeText(message).show();
    }

}