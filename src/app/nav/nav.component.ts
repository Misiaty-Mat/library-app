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
import { catchError, filter, map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  constructor(private authService: AuthService, private router: Router) {}

  user: User | null = null;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  username = ''

  logout() {
    this.authService.logout();
    this.username = ''
    this.user = null
    this.router.navigateByUrl('')
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.authService.getUser().subscribe(
        user => {
        if (user === null) {
          this.user = null
          this.username = ''
          return
        }
        this.user = user;
        this.authService.setuser(user)
        this.username = `${user.name} ${user.surname}`
      })
    })
  }
}
