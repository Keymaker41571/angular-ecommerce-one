import { Component, input, output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  imports: [MatPaginatorModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {

  readonly pageInput = input<number>(1);
  readonly pageSize = input<number>(5);
  readonly pageChanged = output<PageEvent>();
  readonly length = input<number>(0);
}


/*
In Angular 21, input() creates a signal, while output()
creates an event emitter, not a signal.

// Input: receives a value as a signal
protected readonly page = input<number>(1);

// Output: emits an event to the parent
protected readonly pageChanged = output<number>();
*/

/*
1. currentPage signal tracks the current page, starting at 1.
2. pageSize signal controls how many products appear per page.
3. totalPage uses computed() and Math.ceil() to calculate the number of pages.
4. startIndex calculates the first product's array index for the current page.
5. endIndex calculates the index where the current page's products stop.
6. slice() returns only the products for the current page.
7. The HTML @for loop uses paginatedProducts() instead of filteredProducts().
8. Pagination inputs receive the current page, page size, and total product count;
   the output emits page-change events to the parent.
9. The Material paginator binds to those inputs and emits changes through (page).
10. onPageChanged() updates currentPage and pageSize when the user navigates
    or changes the page size. Signals automatically trigger the grid to update.
*/
