import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from '@app/users/interfaces/user.interface';
import { UsersService } from '@app/users/services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'my-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.scss'],
})
export class UserDetailPageComponent implements OnInit {
  public user$: Observable<UserInterface>;

  constructor(private usersService: UsersService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.user$ = this.usersService.getDetail(this.activatedRoute.snapshot.params.userId);
  }
}
