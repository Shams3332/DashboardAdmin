import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Ibook } from '../../models/ibook';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [FormsModule, CommonModule , RouterModule ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit{

    bookJsonData:any[]=[];

    book:Ibook={} as Ibook;

    updateMode: boolean = false;

    URL:string=''
    addBookForm: FormGroup;

    constructor(private BookService:BookService,private formbuilder:FormBuilder){
      this.addBookForm=this.formbuilder.group({
        bookTitle:new FormControl('',[
          Validators.required,
          // Validators.minLength(6),
        ]),
        bookDescription:new FormControl('',[
          Validators.required,
        ]),
        bookPrice:new FormControl('',[
          Validators.required
        ]),
        discount:new FormControl('',[
          Validators.required
        ]),
        Author:new FormControl('',[
          Validators.required
        ]),
        bookImage:new FormControl('',[
          Validators.required
        ]),
        bookPdf:new FormControl('',[
          Validators.required
        ]),
        category:new FormControl('',[
          Validators.required
        ]),

      })
    }

  get bookTitle() {
    return this.addBookForm.get('bookTitle');
  }

  get bookDescription(){
    return this.addBookForm.get('bookDescription');
  }

  get bookPrice(){
    return this.addBookForm.get('bookPrice');
  }

  get discount(){
    return this.addBookForm.get('discount');
  }

  get Author(){
    return this.addBookForm.get('Author');
  }

  get bookImage(){
    return this.addBookForm.get('bookImage');
  }

  get bookPdf(){
    return this.addBookForm.get('bookPdf');
  }

  get category(){
    return this.addBookForm.get('category');
  }


  onSelectFile(e:any):void{
    // console.log(e.target.files[0].name);
    if(e.target.files){
      for(let i=0; i<e.target.files.length; i++){
        const reader=new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.addEventListener('load', (event: Event) => {
          this.URL = (event.target as FileReader).result as string;
          this.book.bookImage=this.URL
        });
        reader.addEventListener('error', (event: Event) => {
          console.log(event);
        });
      }
  }
  }


  getAllBooks() {
    this.BookService.getAllbook().subscribe({
      next: (data: any) => {
        console.log(data.data.allBooks);
        this.bookJsonData = data.data.allBooks;
      },
      error: (error: any) => {
        console.error('Error fetching books:', error);
      }
    });
  }
  ngOnInit(): void {
    this. getAllBooks();

  }


  deletebook(id: any) {
    Swal.fire({
      icon: "warning",
      title: `Are you sure you want to DELETE this book?`,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "CANCEL",
      confirmButtonColor: "#8B0000",
      cancelButtonColor: "#ccafaf",
      iconColor: "#8B0000",
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
          }
        });
      }
    });
  }



}
