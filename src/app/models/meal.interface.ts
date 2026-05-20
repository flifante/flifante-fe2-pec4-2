export interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealDetail {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strTags: string | null;
  strYoutube: string | null;
  [key: string]: string | null | undefined;
}

export interface MealsFilterResponse {
  meals: MealSummary[] | null;
}

export interface MealDetailResponse {
  meals: MealDetail[] | null;
}

export interface CategoriesResponse {
  categories: { strCategory: string }[];
}
