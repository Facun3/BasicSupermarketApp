import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  searchTerm = '';
  minPrice: number | undefined;
  maxPrice: number | undefined;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['search'] || '';
    });
  }

  onSearch() {
    const queryParams: Record<string, string> = {};
    if (this.searchTerm) queryParams['name'] = this.searchTerm;
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
