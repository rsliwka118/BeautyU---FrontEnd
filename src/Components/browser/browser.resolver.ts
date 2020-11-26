import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ObservableArray } from '@nativescript/core';
import { getString } from '@nativescript/core/application-settings';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { catchError, first, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { Salon } from 'src/shared/salon/salon.model';
import { Config } from '../../shared/config';
import { HttpGetService } from '../../shared/http/http-get.service';
import { DataItem, SalonService } from "../../shared/salon/salon.service";

@Injectable({
  providedIn: 'root'
})
export class BrowserResolverService implements Resolve<any> {

  constructor( private http: HttpClient, private salon: SalonService, private getService: HttpGetService ) { }
  
  //public salonsLoaded: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
   //return this.salon.getItems();
    
   return this.http.get(Config.apiAppURL + "/salons", 
       { headers: {
           "Content-Type": "application/json",
           "authorization": getString("accessToken")
           }}).pipe(tap(res => console.log(res))).subscribe()

    
  }
}