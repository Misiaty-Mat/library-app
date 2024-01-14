import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Loan } from '../models/loan';

@Component({
  selector: 'app-all-loans',
  templateUrl: './all-loans.component.html',
  styleUrls: ['./all-loans.component.scss']
})
export class AllLoansComponent {
  constructor(private apiService: ApiService) {}

  loans$ = this.apiService.getAllLoans();

  getStatus(loan: Loan) {
    if (loan.returned) {
      return "Returned"
    } else if (this.isPastReturnDate(loan)) {
      return "Pass retun date"
    } else {
      return "OK"
    }
  }

  isPastReturnDate(loan: Loan): boolean {
    return new Date(loan.return_date) < new Date()
  }
}
