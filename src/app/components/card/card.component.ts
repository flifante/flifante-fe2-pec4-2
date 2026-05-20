import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MealSummary } from '../../models/meal.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() meal!: MealSummary;
  @Output() cardClick = new EventEmitter<string>();

  onClick(): void {
    this.cardClick.emit(this.meal.idMeal);
  }
}
