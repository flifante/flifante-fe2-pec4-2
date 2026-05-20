import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MealSummary } from '../../models/meal.interface';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  @Input() meals: MealSummary[] = [];
  @Output() rowClick = new EventEmitter<string>();

  displayedColumns = ['name', 'actions'];

  onRowClick(id: string): void {
    this.rowClick.emit(id);
  }
}
