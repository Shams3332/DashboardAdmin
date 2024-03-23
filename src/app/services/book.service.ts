import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ibook } from '../models/ibook';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:4000/book';
  Header={}
  constructor(private http: HttpClient) {
    this.Header={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })}
  }

  getAllbook(): Observable<any> {
    return this.http.get(`http://localhost:4000/book/AllBook?limit=50&page=1`);
  }

  deletebook(bookId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${bookId}`);
  }

  // Add New Book
  addBook(book: any): Observable<any> {
    return this.http.post(`http://localhost:4000/book/add`, book);
  }
  // Get Book by ID
  getBookById(bookId: string): Observable<Ibook> {
    return this.http.get<Ibook>(`${this.apiUrl}/${bookId}`);
  }
  updateBook(book: any): Observable<any> {
    return this.http.put(`http://localhost:4000/book/${book._id}`, book);
  }

  // Update Book
  // updateBook(bookId: any): Observable<any> {
  //   return this.http.put(`http://localhost:4000/book/${bookId}`, JSON.stringify(bookId));
  // }

  // updateBook(bookId: string, book: Ibook): Observable<Ibook> {
  //   return this.http.put<Ibook>(`${this.apiUrl}/${bookId}`, book);
  // }
}

