import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { MealsService } from '../../services/meals.service';
import { MealSummary } from '../../models/meal.interface';
import { CardComponent } from '../../components/card/card.component';
import { GridComponent } from '../../components/grid/grid.component';

@Component({
  selector: 'app-meals-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatPaginatorModule,
    CardComponent,
    GridComponent,
  ],
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss'],
  animations: [
    trigger('listAnim', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(40, [
              animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class MealsListComponent implements OnInit {
  private mealsService = inject(MealsService);
  private router = inject(Router);

  categories: string[] = [];
  selectedCategory = 'Chicken';

  allMeals: MealSummary[] = [];
  pagedMeals: MealSummary[] = [];

  isLoading = true;
  error = '';
  viewMode: 'card' | 'grid' = 'card';

  pageSize = 12;
  currentPage = 0;

  ngOnInit(): void {
    this.mealsService.getCategories().subscribe({
      next: (cats) => {
        this.categories = cats;
        this.loadMeals();
      },
      error: () => {
        this.categories = ['Chicken', 'Beef', 'Seafood', 'Pasta', 'Dessert'];
        this.loadMeals();
      },
    });
  }

  loadMeals(): void {
    this.isLoading = true;
    this.error = '';
    this.currentPage = 0;

    this.mealsService.getMealsByCategory(this.selectedCategory).subscribe({
      next: (meals) => {
        this.allMeals = meals;
        this.updatePage();
        this.isLoading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las recetas. Inténtalo de nuevo.';
        this.isLoading = false;
      },
    });
  }

  updatePage(): void {
    const start = this.currentPage * this.pageSize;
    this.pagedMeals = this.allMeals.slice(start, start + this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onMealClick(id: string): void {
    this.router.navigate(['/meals', id]);
  }
}
