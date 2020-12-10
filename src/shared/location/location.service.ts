import { Injectable } from "@angular/core";
import { ToastsService } from "../toasts.service";
import { City } from "./location.model"

@Injectable({
    providedIn: "root"
})
export class LocationService {

    constructor(private toast: ToastsService) {}
    
    cities: Array<City>

}
