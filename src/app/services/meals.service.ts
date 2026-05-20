import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  MealSummary,
  MealDetail,
  MealsFilterResponse,
  MealDetailResponse,
  CategoriesResponse,
} from '../models/meal.interface';

@Injectable({ providedIn: 'root' })
export class MealsService {
  private http = inject(HttpClient);
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1';

  getCategories(): Observable<string[]> {
    return this.http
      .get<CategoriesResponse>(`${this.apiUrl}/categories.php`)
      .pipe(map((res) => res.categories.map((c) => c.strCategory)));
  }

  getMealsByCategory(category: string): Observable<MealSummary[]> {
    return this.http
      .get<MealsFilterResponse>(`${this.apiUrl}/filter.php?c=${category}`)
      .pipe(map((res) => res.meals ?? []));
  }

  getMealById(id: string): Observable<MealDetail> {
    return this.http
      .get<MealDetailResponse>(`${this.apiUrl}/lookup.php?i=${id}`)
      .pipe(map((res) => res.meals![0]));
  }

  getIngredients(meal: MealDetail): { name: string; measure: string }[] {
    const result: { name: string; measure: string }[] = [];
    for (let i = 1; i <= 20; i++) {
      const name = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (name && name.trim()) {
        result.push({ name: name.trim(), measure: measure?.trim() ?? '' });
      }
    }
    return result;
  }
}
