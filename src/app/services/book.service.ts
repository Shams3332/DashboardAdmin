import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ibook } from '../models/ibook';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:4000/book';

  constructor(private http: HttpClient) {}

  getAllbook(): Observable<any> {
    return this.http.get(`http://localhost:4000/book/AllBook`);
  }

  deletebook(bookId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${bookId}`);
  }

  // Add New Book
  addBook(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, formData);
  }

  // Get Book by ID
  getBookById(bookId: string): Observable<Ibook> {
    return this.http.get<Ibook>(`${this.apiUrl}/${bookId}`);
  }

  // Update Book
  updateBook(bookId: string, book: Ibook): Observable<Ibook> {
    return this.http.put<Ibook>(`${this.apiUrl}/${bookId}`, book);
  }
}

