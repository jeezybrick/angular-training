import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public setItem(key: string, value: string): StorageService {
    localStorage.setItem(key, value);
    return this;
  }

  public getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  public removeItem(key: string): StorageService {
    localStorage.removeItem(key);
    return this;
  }

  public clear(): StorageService {
    localStorage.clear();
    return this;
  }
}
