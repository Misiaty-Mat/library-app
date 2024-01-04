import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements DoCheck {
  private breakpointObserver = inject(BreakpointObserver);

  constructor(private authService: AuthService) {}

  user: User | null = null;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  username$ = of('')

  logout() {
    this.authService.logout();
    this.username$ = of('')
    this.user = null
  }

  ngDoCheck(): void {
    this.username$ = this.authService.getUser().pipe(
      map(user => {
        if (user === null) {
          this.user = null
          return ''
        }
        this.user = user;
        this.authService.setuser(user)
        return `${user.name} ${user.surname}`
      })
    );
  }
}
