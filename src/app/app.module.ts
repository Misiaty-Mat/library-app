import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './apiConfig/appConfig.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BooksComponent } from './books/books.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { LoansComponent } from './loans/loans.component';
import { AllLoansComponent } from './all-loans/all-loans.component';
import { AddBookComponent } from './add-book/add-book.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [AppComponent, NavComponent, LoginComponent, BooksComponent, RegisterComponent, UsersComponent, LoansComponent, AllLoansComponent, AddBookComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [{ provide: APP_SERVICE_CONFIG, useValue: APP_CONFIG }],
  bootstrap: [AppComponent],
})
export class AppModule {}
