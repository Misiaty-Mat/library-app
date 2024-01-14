import { Book } from "./book";
import { User } from "./user";

export interface Loan {
  id: string;
  return_date: Date;
  returned: boolean;
  user: User;
  book: Book;
}
