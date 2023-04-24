import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventComponent } from './create-event.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: 'calendar/new',
    component: CreateEventComponent,
  },
];

@NgModule({
  declarations: [CreateEventComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule, CreateEventComponent],
})
export class CreateEventModule {}
