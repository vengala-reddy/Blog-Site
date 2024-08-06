import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IBlog } from '../models/blog.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './blog-search.component.html',
  styleUrl: './blog-search.component.scss',
})
export class BlogSearchComponent {
  category: string = '';
  durationFrom: string = '';
  durationTo: string = '';
  blogs: IBlog[] = [];
  http = inject(HttpClient);
  apiURL = `http://localhost:3001/api/v1.0/blogsite/blogs/get`;
  onSearch() {
    if (this.category && this.durationFrom && this.durationTo) {
      this.http.get(`${this.apiURL}/${this.category}/${this.durationFrom}/${this.durationTo}`).subscribe({
        next: (res: any) => {
          this.blogs = res.result;
        },
        error: (err: any) => {
          console.log('Failed to fetch blogs', err);
          console.error('Failed to fetch blogs', err.error.message);
        }
      });
    }
  }
}
