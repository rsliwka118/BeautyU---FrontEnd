import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, EMPTY, Observable, of, throwError } from "rxjs";
import { catchError, first, map, switchMap, take, tap } from "rxjs/operators";
import { HttpGetService } from "../../shared/http/http-get.service";
import { Rate, Salon } from "./salon.model";
import { Config } from "../config";
import { ObservableArray } from "@nativescript/core";
import { getString } from "@nativescript/core/application-settings";
import { RouterExtensions } from "@nativescript/angular";
import { openUrl } from "@nativescript/core/utils";
import { HttpPostService } from "../http/http-post.service";
import { ToastsService } from "../toasts.service";
import { HttpDeleteService } from "../http/http-delete.service";

@Injectable({
    providedIn: "root"
})
export class SalonService {

    category: string
    type: number
    public favList = []
    public salon: Salon
    public salonID: string
    public isMySalon: boolean
    
    constructor( 
        private http: HttpClient, 
        private getService: HttpGetService,
        private deleteService: HttpDeleteService, 
        private postService: HttpPostService, 
        private router: RouterExtensions,
        private toast: ToastsService
        ) { 
      this.category = ""
      this.isMySalon = false
    }

    public getPreview() {
        let typeUrl: string
        let headers = new HttpHeaders({
        "Content-Type": "application/json",
        "authorization": getString("accessToken")
        })

        switch (this.type) {
          case 0:
              typeUrl = "hairdresser"
              this.category = "Fryzjer"
              break
          case 1:
              typeUrl = "barber"
              this.category = "Barber"
              break
          case 2:
              typeUrl = "beautician"
              this.category = "Makijaż"
              break
          case 3:
              typeUrl = "nails"
              this.category = "Paznokcie"
              break
          case 4:
              typeUrl = "massager"
              this.category = "Masaż"
              break
          case 5:
              typeUrl = "depilation"
              this.category = "Depilacja"
              break
          default:
              console.log("incorrect type")
              break
        }

        return this.http.get(Config.apiAppURL + "/previews/" + typeUrl, {headers: headers})
    }

    public getSalon(id: string){
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "authorization": getString("accessToken")
            })
            
        return this.http.get(Config.apiAppURL + "/salons/" + id, {headers: headers})
    }
    
    public fav(salonId: string){

        this.postService
        .postData(Config.apiAppURL + "/fav/"+ getString("userID") , { id: salonId }, true)
        .subscribe(res => {
            let response = <any>res
            this.toast.showToast(response.message)
            this.addToFavArray(salonId)
        }, error => {
            this.toast.showToast(error.error) 
        })
        
    }

    public unfav(salonId: string){
        this.http
        .delete(Config.apiAppURL + "/fav/" + getString("userID") + "/" + salonId, 
        { headers: { 
            "Content-Type": "application/json",
            "authorization": getString("accessToken")
            }
        })
        .subscribe(res => {
            let response = <any>res
            this.toast.showToast(response.message)
            this.removeFromFavArray(salonId)
        }, error => {
            this.toast.showToast(error.error) 
        })
    }

    public getFav(){
        return this.postService
        .postData(Config.apiAppURL + "/myfavs/"+ getString("userID"), { favList: this.favList }, true)
        
    }

    public isFav(salonId: string, favs: string[]): boolean {

        const res = favs.includes(salonId)
        return res
    }

    public checkRoute(names: Array<string>): boolean {
        for(let i = 0;i < names.length; i++){
                if(this.router.router.url.includes(names[i])) {
                        return true;
                }
        }
        return false;
    }

    public getLocation(loc): string {
        let _location = 
        loc.city + ", ul. " + 
        loc.street + " " +
        loc.houseNumber +
        (loc.apartmentNumber==="" ? "" : "/" + loc.apartmentNumber)
        
        return _location
    }
    
    public getHours(hours) {
        let hrs = hours.split('#')
        let buff

        for(let i=0; i < hrs.length; i++){
            hrs[i]=hrs[i].split('&')
        }

        return hrs
    }

    public getServiceInfo(service): string {
        let info = service.price +"zł | "+service.time+"min"
        return info
    }

    public openMap(location) {
        let splitCity = location.city.split(' ')
        let city = ""
        let url

        for(let i=0; i < splitCity.length; i++){
            city += "+" + splitCity[i]
        }

        url = location.street + "+" + location.houseNumber + "+" + location.code + city

        openUrl( "https://www.google.pl/maps/place/" + url )
    }

    public rateAVG(rates: Rate[]) {
    
        if(rates.length === 0){
            
            return "-"
        }
        
        let sum = 0
        
        for( let i = 0; i < rates.length; i++ ) {
            sum += Number(rates[i].rate)
        }
        let avg = sum/rates.length

        return avg.toFixed(1)
    }

    public onItemTap(id) {

        this.router.navigate(['/menu/details', id])
        this.salonID = id

    }

    public onFavTap(salonId: string, isFav) {
        console.log("-----FAV "+salonId)
        if(isFav) this.unfav(salonId)
        else this.fav(salonId)

    }

    public createFavArray(fav:any) {

        this.favList = []

        for(let i=0; i<fav.length; i++){
          this.favList[i] = fav[i].salon
        }
    
    }
    
    private removeFromFavArray(salonId: string){

        const index = this.favList.indexOf(salonId);
        if (index > -1) {
            this.favList.splice(index, 1);
        }
    }

    private addToFavArray(salonId: string){
        this.favList.push(salonId)
    }

    public serviceDone(){
        this.router.navigate(['/menu/salon/'])
    }

    public setFav(salons) {

        for(let i=0; i<salons.length; i++){
            salons[i].isFav = this.isFav(salons[i].id, this.favList)
        }

    }
    
}
