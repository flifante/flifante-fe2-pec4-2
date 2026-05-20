import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MealsService } from '../../services/meals.service';
import { MealDetail } from '../../models/meal.interface';

@Component({
  selector: 'app-meal-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatChipsModule,
    MatDividerModule,
    MatListModule,
  ],
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.scss'],
})
export class MealDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private mealsService = inject(MealsService);

  meal: MealDetail | null = null;
  ingredients: { name: string; measure: string }[] = [];
  isLoading = true;
  error = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/meals']);
      return;
    }
    this.mealsService.getMealById(id).subscribe({
      next: (meal) => {
        this.meal = meal;
        this.ingredients = this.mealsService.getIngredients(meal);
        this.isLoading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la receta.';
        this.isLoading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/meals']);
  }
}
