import { ChangeDetectionStrategy, Component, Injectable, OnInit } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { AuthService } from '../../shared/auth/auth.service'
import { SearchBar } from "@nativescript/core/ui/search-bar"
import { HttpPostService } from "../../shared/http/http-post.service";
import { HttpGetService } from "../../shared/http/http-get.service";
import { Config } from "../../shared/config";
import { SalonService } from "../../shared/salon/salon.service";
import { Salon } from "src/shared/salon/salon.model";
import { ListView } from "@nativescript/core";

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
  public salons: Array<Salon>
  public list: ListView

  constructor(public auth: AuthService, private page: Page, public salon: SalonService) {
  }
  

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

  ngOnInit() {
    this.salon.getSalon()
  }
  
  //List
  public onItemTap(args) {
   // console.log("------------------------ ItemTapped: " + args.index);
 
  }
}
