import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit {


  messages: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages(): void {
    axios.get("http://localhost:4000/contact")
      .then(response => {
        this.messages = response.data;
      })
      .catch(error => {
        console.error("Error fetching messages:", error);
      });
  }

  handleDelete(id: any): void {
    Swal.fire({
      icon: "warning",
      title: `Are you sure you want to DELETE this message?`,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "CANCEL",
      confirmButtonColor: "#8B0000",
      cancelButtonColor: "#ccafaf",
      iconColor: "#8B0000",
    }).then((result: any) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:4000/contact/${id}`)
          .then((res) => {
            console.log(res);
            this.messages = this.messages.filter(message => message._id !== id);
            Swal.fire("Deleted!", "The review has been deleted.", "success");
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Error!", "Failed to delete the review.", "error");
          });
      }
    });
  }

}
