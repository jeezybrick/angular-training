import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { CurrentUserInterface } from '../interfaces/client/current-user.interface';

enum StorageAuthKeysEnum {
  accessToken = 'accessToken',
  currentUser = 'currentUser',
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser$: BehaviorSubject<CurrentUserInterface | null> = new BehaviorSubject<CurrentUserInterface>(
    this.getCurrentUserFromStorage(),
  );

  constructor(
    @Inject(HttpClient) private http: HttpClient,
    private storageService: StorageService,
  ) {}

  public get currentUserValue(): CurrentUserInterface {
    return this.currentUser$.value;
  }

  public getCurrentUser(): Observable<CurrentUserInterface | null> {
    return this.currentUser$.asObservable();
  }

  public setCurrentUser(user: CurrentUserInterface | null, isSaveToStorage: boolean = true): void {
    this.currentUser$.next(user);

    if (isSaveToStorage) {
      this.setCurrentUserToStorage(user);
    }
  }

  public isAuthenticated(): boolean {
    return (
      this.storageService.getItem(StorageAuthKeysEnum.accessToken) !== null &&
      this.storageService.getItem(StorageAuthKeysEnum.currentUser) !== null
    );
  }

  public logout(): void {
    this.setCurrentUser(null, false);
  }

  public setToken(token: string): void {
    this.storageService.setItem(StorageAuthKeysEnum.accessToken, token);
  }

  public getToken(): string | null {
    return this.storageService.getItem(StorageAuthKeysEnum.accessToken);
  }

  public getAuthHeader(): string {
    return `Bearer ${this.getToken()}`;
  }

  public setCurrentUserToStorage(user: CurrentUserInterface): void {
    this.storageService.setItem(StorageAuthKeysEnum.currentUser, JSON.stringify(user));
  }

  public getCurrentUserFromStorage(): CurrentUserInterface {
    return JSON.parse(this.storageService.getItem(StorageAuthKeysEnum.currentUser));
  }
}
