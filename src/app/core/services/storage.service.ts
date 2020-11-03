import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-web-apis/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor(@Inject(LOCAL_STORAGE) readonly localStorage: Storage) {
  }
  public setItem(key: string, value: string): StorageService {
    this.localStorage.setItem(key, value);
    return this;
  }

  public getItem(key: string): string | null {
    return this.localStorage.getItem(key);
  }

  public removeItem(key: string): StorageService {
    this.localStorage.removeItem(key);
    return this;
  }

  public clear(): StorageService {
    this.localStorage.clear();
    return this;
  }
}
