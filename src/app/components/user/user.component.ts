import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import axios from 'axios';
import Swal from 'sweetalert2';


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



  handleDelete(id:any){

    Swal.fire({
      icon: "warning",
      title: `Are you sure you want to DELETE ${id}?`,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "CANCEL",
      confirmButtonColor: "#8B0000",
      cancelButtonColor: "#ccafaf",
      iconColor: "#8B0000",
    }).then((result:any) => {
      if (result.isConfirmed) {

    axios
    .delete(`http://localhost:4000/user/${id}`)
    .then((res) => {
      console.log(res);
      this.myUsers=[...this.myUsers.filter((user:any) => user._id !== id)]
    })
    .catch((err) => {
      console.log(err);
    });

      }}) }

}


  // deleteUser(id: string): void {
  //   axios.delete(`http://localhost:4000/user/${id}`)
  //     .then(response => {
  //       console.log("User deleted successfully");
  //       this.fetchUsers();
  //     })
  //     .catch(error => {
  //       console.error("Error deleting user:", error);
  //     });
  // }
