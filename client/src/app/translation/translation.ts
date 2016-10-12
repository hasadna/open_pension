/**
 * Created by ranwahle on 10/10/2016.
 */
import { OpaqueToken } from '@angular/core';

// import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import {LANG_HE_NAME, LANG_HE_TRANS} from "./lang-he";

// translation token
export const TRANSLATIONS = new OpaqueToken('translations');

// all traslations
const dictionary = {
  [LANG_EN_NAME]: LANG_EN_TRANS,
  [LANG_HE_NAME]: LANG_HE_TRANS

};

// providers
export const TRANSLATION_PROVIDERS = [
  { provide: TRANSLATIONS, useValue: dictionary },
];
