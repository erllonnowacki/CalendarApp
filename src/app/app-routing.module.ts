import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '',
    loadChildren: () =>
      import('./components/calendar/calendar.module').then(
        (m) => m.CalendarModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./components/create-event/create-event.module').then(
        (m) => m.CreateEventModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
