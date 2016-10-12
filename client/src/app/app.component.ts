import { Component } from '@angular/core';
import {Store} from "./app.store";
import {RightToLeft} from './translation/translation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private _store:Store){}

  get IsLangRtl():boolean{
    return RightToLeft.indexOf(this._store.state.language) >= 0;
  }
}
