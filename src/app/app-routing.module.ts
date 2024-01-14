import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BooksComponent } from './books/books.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { LoansComponent } from './loans/loans.component';
import { AllLoansComponent } from './all-loans/all-loans.component';
import { AddBookComponent } from './add-book/add-book.component';

const routes: Routes = [
  { path: '', component: BooksComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UsersComponent },
  { path: 'loans', component: AllLoansComponent },
  { path: 'loans/my', component: LoansComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
