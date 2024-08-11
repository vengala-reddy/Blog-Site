import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogSearchComponent } from "./blog-search/blog-search.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BlogSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'blog-site-app';
}
