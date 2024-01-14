import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  constructor(private apiService: ApiService) {}

  users$ = this.apiService.getUsers()

  deleteUser(userId: string) {
    this.apiService.deleteUser(userId).subscribe(
      () => this.users$ = this.apiService.getUsers()
    )
  }
}
