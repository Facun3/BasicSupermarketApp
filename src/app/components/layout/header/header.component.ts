import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchBarComponent } from '@app/components/search-bar/search-bar.component';

interface HeaderSection {
  title: string;
  href: string;
}

@Component({
  selector: 'app-header',
  imports: [SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  sections: HeaderSection[] = [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Products',
      href: '/products',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ];
}
