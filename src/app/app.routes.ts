import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'meals',
    pathMatch: 'full',
  },
  {
    path: 'meals',
    loadComponent: () =>
      import('./pages/meals-list/meals-list.component').then(
        (m) => m.MealsListComponent
      ),
  },
  {
    path: 'meals/:id',
    loadComponent: () =>
      import('./pages/meal-detail/meal-detail.component').then(
        (m) => m.MealDetailComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'meals',
  },
];
