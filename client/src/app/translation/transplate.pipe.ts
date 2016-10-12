/**
 * Created by ranwahle on 10/10/2016.
 */
import { Pipe, PipeTransform } from '@angular/core';
import {TranslateService} from "./trnanslate.service";


@Pipe({
  name: 'translate',
  pure: false // impure pipe, update value when we change language
})

export class TranslatePipe implements PipeTransform {

  constructor(private _translate: TranslateService) { }

  transform(value: string, args: any[]): any {
    if (!value) return;

    return this._translate.instant(value);
  }
}
