import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Loan } from '../models/loan';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent {
  constructor(private apiService: ApiService) {}

  loans$ = this.apiService.getMyLoans();


  isPastReturnDate(loan: Loan): boolean {
    return !loan.returned && new Date(loan.return_date) < new Date()
  }

  returnBook(loan: Loan) {
    this.apiService.returnBookFromLoan(loan.id).subscribe(
      () => this.loans$ = this.apiService.getMyLoans()
    );
  }
}
