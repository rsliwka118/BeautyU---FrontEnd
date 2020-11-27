import { ChangeDetectionStrategy, Component, Injectable, OnInit } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { AuthService } from '../../../shared/auth/auth.service'
import { SearchBar } from "@nativescript/core/ui/search-bar"
import { HttpPostService } from "../../../shared/http/http-post.service";
import { HttpGetService } from "../../../shared/http/http-get.service";
import { Config } from "../../../shared/config";
import { Categories, DataItem, SalonService } from "../../../shared/salon/salon.service";
import { Salon } from "../../../shared/salon/salon.model";
import { ListView, ObservableArray } from "@nativescript/core";
import { HttpLoaderService } from "../../../shared/http/http-loader.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { catchError, first, map, switchMap, take } from "rxjs/operators";
import { MenuComponent } from "../menu/menu.component";
import { RouterExtensions } from "@nativescript/angular";

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

  //public salons: Array<Salon>
  //public list: ListView

  items$: Observable<DataItem[]>;
  _categories: ObservableArray<Categories>

  constructor(
    public auth: AuthService, 
    private page: Page, 
    public salon: SalonService,
    private activatedRoute: ActivatedRoute,
    private router: RouterExtensions) { }
  

  //Search bar
  onSubmit(args) {
      const searchBar = args.object as SearchBar;
      console.log(`Searching for ${searchBar.text}`);
  }

  onTextChanged(args) {
      const searchBar = args.object as SearchBar;
      console.log(`Input changed! New value: ${searchBar.text}`);
  }

  onClear(args) {
      const searchBar = args.object as SearchBar;
      console.log(`Clear event raised`);
  }

//RadList
  get categories(): ObservableArray<Categories> {
    return this._categories;
}

  // //List
  // public onItemTap(args) {
  //  // console.log("------------------------ ItemTapped: " + args.index);
 
  // }
  
  onTabClick() {
    console.log(this.router.router.url);
    this.router.navigate(['/menu/category']);
  }

  ngOnInit(): void {

    this._categories = new ObservableArray(this.salon.getCategories());
    
    //console.log(this.route.snapshot.data)      
        
    }
}

