import { CalendarComponent } from './calendar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
  {
    path: 'calendar',
    component: CalendarComponent,
  },
];

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    MatIconModule,
    MatSnackBarModule,
    DragDropModule,
    MatDialogModule,
    MatNativeDateModule,
    MatCardModule,
    MatDatepickerModule,
    MatChipsModule,
    MatButtonModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [CalendarComponent, RouterModule],
  providers: [EventService],
})
export class CalendarModule {}
