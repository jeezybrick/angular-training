import { Component, OnInit } from '@angular/core';
import { UsersService } from '@app/users/services/users.service';
import { Observable } from 'rxjs';
import { UserInterface } from '@app/users/interfaces/user.interface';

@Component({
  selector: 'my-users-list-page',
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.scss']
})
export class UsersListPageComponent implements OnInit {
  public users$: Observable<UserInterface[]>;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.users$ = this.usersService.getList();
  }

}
