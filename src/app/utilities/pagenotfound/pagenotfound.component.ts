import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  template: `<div class="w-50 m-auto shadow p-5 div-container mt-2 text-center">
    <h2>pag not found</h2>
  </div>`,
  styles: [
    `
      .div-container {
        border-radius: 2rem;
        min-width: 20rem;
      }
    `,
  ],
})
export class PagenotfoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
