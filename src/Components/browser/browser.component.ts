import { Component, Injectable, OnInit } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { AuthService } from '../../shared/auth/auth.service'
import { SearchBar } from "@nativescript/core/ui/search-bar"

@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'ns-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

  constructor(public auth: AuthService, private page: Page) {}
  searchPhrase: string;

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
  ngOnInit(): void {}

}
