import { ChangeDetectionStrategy, Component, Injectable, OnInit } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { AuthService } from '../../shared/auth/auth.service'
import { SearchBar } from "@nativescript/core/ui/search-bar"

class DataItem {
  constructor(public id: number, public name: string) { }
}

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

  searchPhrase: string;
  public salons: Array<DataItem>;
  private counter: number;

  constructor(public auth: AuthService, private page: Page) {
    this.salons = [];
    this.counter = 0;
    for (var i = 0; i < 10; i++) {
        this.salons.push(new DataItem(i, "data item " + i));
        this.counter = i;
    }
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
  ngOnInit(): void {}
  
  //List
  public onItemTap(args) {
    console.log("------------------------ ItemTapped: " + args.index);
}
}
