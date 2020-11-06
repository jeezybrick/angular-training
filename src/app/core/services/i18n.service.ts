import { Injectable } from '@angular/core';

export enum Lang {
  en = 'en',
}

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  public currentLanguage: Lang = Lang.en;

  public getLanguage(): string {
    return this.currentLanguage;
  }
}
