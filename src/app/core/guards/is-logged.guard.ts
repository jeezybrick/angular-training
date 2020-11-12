import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  public canActivate(): boolean {
    return this.canActivateOrLoad();
  }

  public canLoad(): boolean {
    return this.canActivateOrLoad();
  }

  private canActivateOrLoad(): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/marketplace']);
      return false;
    }
    return true;
  }
}
