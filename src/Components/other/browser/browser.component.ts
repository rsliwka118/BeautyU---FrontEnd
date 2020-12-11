import { ChangeDetectionStrategy, Component, Injectable, OnInit } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { AuthService } from '../../../shared/auth/auth.service'
import { SearchBar } from "@nativescript/core/ui/search-bar"
import { HttpPostService } from "../../../shared/http/http-post.service";
import { HttpGetService } from "../../../shared/http/http-get.service";
import { Config } from "../../../shared/config";
import { SalonService } from "../../../shared/salon/salon.service";
import { Salon } from "../../../shared/salon/salon.model";
import { ListView, ObservableArray } from "@nativescript/core";
import { HttpLoaderService } from "../../../shared/http/http-loader.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { catchError, first, map, switchMap, take } from "rxjs/operators";
import { MenuComponent } from "../menu/menu.component";
import { RouterExtensions } from "@nativescript/angular";
import { LocationService } from "../../../shared/location/location.service";

@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'ns-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowserComponent implements OnInit {

  searchPhrase: string


  constructor(
    public auth: AuthService, 
    private page: Page, 
    public salon: SalonService,
    public location: LocationService,
    private activatedRoute: ActivatedRoute,
    private router: RouterExtensions) { 
      this.page.actionBarHidden = false;
    }
  

  //Search bar
  onSubmit(args) {
      const searchBar = args.object as SearchBar
      console.log(`Searching for ${searchBar.text}`)
  }

  onTextChanged(args) {
      const searchBar = args.object as SearchBar
      console.log(`Input changed! New value: ${searchBar.text}`)
  }

  onClear(args) {
      const searchBar = args.object as SearchBar
      console.log(`Clear event raised`)
  }
  
  onTabClick(type: number) {
    this.salon.type = type
    this.router.navigate(['/menu/category'])
  }
  
  ngOnInit(): void {
    var searchBar = this.page.getViewById('search-bar');
    if (searchBar.android) {
        searchBar.android.clearFocus();
    }
    
  }
}

