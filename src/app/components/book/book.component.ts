import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Ibook } from '../../models/ibook';
import { Router, RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnInit {
  updateDone: boolean = false;
  bookJsonData: any[] = [];
  selectedFile: File | null = null;
  imageSelected: boolean = false;
  selectedPdfFile: File | null = null;
  book: Ibook = {} as Ibook;
  categoryNames: any[] = [];
  updateMode: boolean = false;
  books: any = {
    newBookTitle: '',
    newBookDescription: '',
    newBookPrice: '',
    newDiscount: '',
    newAuthor: '',
    newbookImage: null,
    newbookPdf: '',
    newCategory: '',
    newPlanProfilePicture: null,
  };
  URL: string = '';
  addBookForm: FormGroup;
  constructor(
    private BookService: BookService,
    private formbuilder: FormBuilder,
    private router: Router
  ) {
    this.addBookForm = this.formbuilder.group({
      bookTitle: new FormControl('', [
        Validators.required,
        // Validators.minLength(6),
      ]),
      bookDescription: new FormControl('', [Validators.required]),
      bookPrice: new FormControl('', [Validators.required]),
      discount: new FormControl('', [Validators.required]),
      Author: new FormControl('', [Validators.required]),
      bookImage: new FormControl('', [Validators.required]),
      bookPdf: new FormControl('', [Validators.required]),
      category: new FormControl('', []),
    });
  }

  get bookTitle() {
    return this.addBookForm.get('bookTitle');
  }

  get bookDescription() {
    return this.addBookForm.get('bookDescription');
  }

  get bookPrice() {
    return this.addBookForm.get('bookPrice');
  }

  get discount() {
    return this.addBookForm.get('discount');
  }

  get Author() {
    return this.addBookForm.get('Author');
  }

  get bookImage() {
    return this.addBookForm.get('bookImage');
  }

  get bookPdf() {
    return this.addBookForm.get('bookPdf');
  }

  get category() {
    return this.addBookForm.get('category');
  }

  onSelectFile(e: any): void {
    // console.log(e.target.files[0].bookTitle);
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.addEventListener('load', (event: Event) => {
          this.URL = (event.target as FileReader).result as string;
          this.book.bookImage = this.URL;
        });
        reader.addEventListener('error', (event: Event) => {
          console.log(event);
        });
      }
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.imageSelected = true;
  }

  onPdfSelected(event: any): void {
    this.selectedPdfFile = event.target.files[0];
  }
  getAllBooks() {
    this.BookService.getAllbook().subscribe({
      next: (data: any) => {
        console.log(data.data.allBooks);
        this.bookJsonData = data.data.allBooks;
      },
      error: (error: any) => {
        console.error('Error fetching books:', error);
      },
    });
  }
  ngOnInit(): void {
    this.getAllBooks();
  }

  addBook() {
    const formData = new FormData();
    console.log(formData.get('bookTitle'));
    console.log(this.bookTitle?.value); // Using optional chaining here
    console.log(formData.get('bookDescription'));
    console.log(this.bookDescription?.value);
    if (this.selectedFile) {
      formData.append('bookImage', this.selectedFile);
    }
    if (this.selectedPdfFile) {
      formData.append('bookPdf', this.selectedPdfFile);
    }
    formData.append('bookTitle', this.books.newBookTitle);
    formData.append('bookDescription', this.books.newBookDescription);
    formData.append('bookPrice', this.books.newBookPrice);
    formData.append('discount', this.books.newDiscount);
    formData.append('Author', this.books.newAuthor);
    formData.append('category', this.books.newCategory);

    this.BookService.addBook(formData).subscribe({
      next: (data: any) => {
        if (data && data.newBook) {
          console.log(data.newBook); // Check the structure of the response
          this.book = data.newBook;
          this.bookJsonData.push(data.newBook); // Assuming the response contains the new book object
          this.getAllBooks();
          // this.addBookForm.reset();
        } else {
          console.error('Unexpected response format:', data);
        }
      },
    });
  }

  deletebook(id: any) {
    Swal.fire({
      icon: 'warning',
      title: `Are you sure you want to DELETE this book?`,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'CANCEL',
      confirmButtonColor: '#8B0000',
      cancelButtonColor: '#ccafaf',
      iconColor: '#8B0000',
    }).then((result: any) => {
      if (result.isConfirmed) {
        console.log('Deleting book with id:', id);
        if (!id) {
          console.error('Error: ID is undefined');
          return; // Return early if id is undefined
        }

        this.BookService.deletebook(id).subscribe({
          next: (data) => {
            console.log('Coupon deleted successfully:', data);
            this.getAllBooks();
          },
          error: (error) => {
            console.error('Error deleting coupon:', error);
            // Handle error
          },
        });
      }
    });
  }

  updateBook(id: string) {
    let updatedBook = this.bookJsonData.find((book) => book._id === id);
    if (updatedBook) {
      // Populate the form with the selected book's data
      this.books = {
        newBookTitle: updatedBook.bookTitle,
        newBookDescription: updatedBook.bookDescription,
        newBookPrice: updatedBook.bookPrice,
        newDiscount: updatedBook.discount,
        newAuthor: updatedBook.Author,
        newCategory: updatedBook.category,
      };
      // Set the flag to indicate update mode
      this.updateDone = true;
    }
  }

  // Method to update the book
  updateBookData() {
    // Call the service method to update the book data
    this.BookService.updateBook(this.books).subscribe({
      next: () => {
        // Reset the form and update flag
        this.addBookForm.reset();
        this.updateDone = false;
        // Fetch all books again after update
        this.getAllBooks();
      },
      error: (error) => {
        console.error('Error updating book:', error);
        // Handle error
      },
    });
  }
  submitBook() {
    if (this.updateDone) {
      this.updateBookData(); // Call update method
    } else {
      this.addBook(); // Call add method
    }
  }
}
