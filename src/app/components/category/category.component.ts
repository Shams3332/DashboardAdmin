import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {


  myCategories: any[] = [];
  selectedImageFile: File | null = null;

  constructor() {}

  ngOnInit(): void {
    axios
      .get("http://localhost:4000/category")
      .then((response: any) => {
        if (response.data && response.data.status === "SUCCESS") {
          this.myCategories = response.data.data.allCategories;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }


  handleDelete(id: any): void {
    Swal.fire({
      icon: "warning",
      title: `Are you sure you want to DELETE this category?`,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "CANCEL",
      confirmButtonColor: "#8B0000",
      cancelButtonColor: "#ccafaf",
      iconColor: "#8B0000",
    }).then((result: any) => {
      if (result.isConfirmed) {
        // If user confirms, proceed with delete action
        axios
          .delete(`http://localhost:4000/category/${id}`)
          .then((res) => {
            console.log(res);
            // Update categories list after successful deletion
            this.myCategories = this.myCategories.filter((category: any) => category._id !== id);
            Swal.fire({
              icon: 'success',
              title: 'Category deleted successfully!',
              showConfirmButton: false,
              timer: 1500
            });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              icon: 'error',
              title: 'Failed to delete category!',
              text: err.message || 'An error occurred while deleting the category.',
              confirmButtonText: 'OK',
              confirmButtonColor: "#8B0000"
            });
          });
      }
    });
  }


handleSubmit(form: NgForm): void {
    // Get category name from form
    let category = form.value.newCategory;

    // Get image file from component property
    let imageFile = this.selectedImageFile;

    // Check if image file is available
    if (imageFile) {
        // Create FormData object
        let formData = new FormData();
        formData.append('categoryName', category);
        formData.append('categoryImage', imageFile);

        // Make axios POST request
        axios
            .post(`http://localhost:4000/category`, formData)
            .then((res) => {
                console.log(res); // Log the response for debugging
                if (res.data && res.data.status === "SUCCESS") {
                    // Update UI to reflect the newly created category
                    this.myCategories.push(res.data.data.newCategory);
                    // Optionally, you can reset the form here
                    form.reset();
                } else {
                    console.error("Category creation failed:", res.data.message);
                }
            })
            .catch((err) => {
                console.error('Failed to create category:', err);
            });
    } else {
        console.error('Image file not selected.');
    }
}

onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
        this.selectedImageFile = fileList[0];
    }
}

}
