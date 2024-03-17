import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  myUsers: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    axios.get("http://localhost:4000/user")
      .then(response => {
        this.myUsers = response.data.data.users;
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }

  deleteUser(id: string): void {
    axios.delete(`http://localhost:4000/user/${id}`)
      .then(response => {
        console.log("User deleted successfully");
        this.fetchUsers(); // Refresh the user list after deletion
      })
      .catch(error => {
        console.error("Error deleting user:", error);
      });
  }
}
