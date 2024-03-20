import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  myCarts: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.fetchCarts();
  }

  fetchCarts(): void {
    axios.get("http://localhost:4000/cart/all")
      .then(response => {
        if (response.data && response.data.status === "success") {
          this.myCarts = response.data.cart;
        } else {
          console.error("Failed to fetch carts:", response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching carts:", error);
      });
  }



}
