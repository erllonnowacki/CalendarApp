import { Component } from '@angular/core';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';

import { of } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  dateSelected = new Date();
  events: Event[] = [];
  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  daysOfMonth: number[][] = [];

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.eventService.eventosChanged.subscribe((eventos: Event[]) => {
      this.events = eventos;
    });

    this.eventService.eventosExcluido.subscribe((id: number) => {
      this.events = this.events.filter((event) => event.id !== id);
    });

    of(this.eventService.getEvents()).subscribe((events: Event[]) => {
      this.events = events;
      this.generateDaysOfMonth();
    });
  }

  newEvent() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  trackByIndex(item: any): number {
    return item.index;
  }

  eventsDateSelected() {
    return this.events
      .filter(
        (event) =>
          event.date instanceof Date &&
          event.date.toDateString() === this.dateSelected?.toDateString()
      )
      .map((event, index) => ({ index, event }));
  }

  removeEvent(event: any) {
    this.eventService.removeEvent(event);
    this.events = this.eventService.getEventsData(this.dateSelected);
  }

  generateDaysOfMonth(): void {
    const year = this.dateSelected.getFullYear();
    const month = this.dateSelected.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    this.daysOfMonth = [];

    let week: number[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      const dayOfWeek = day.getDay();

      if (i === 1) {
        for (let j = 0; j < dayOfWeek; j++) {
          week.push(0);
        }
      }

      week.push(i);

      if (dayOfWeek === 6 || i === daysInMonth) {
        this.daysOfMonth.push(week);
        week = [];
      }
    }
  }

  onDateChange(date: Date) {
    this.dateSelected = date;
    this.generateDaysOfMonth();
  }

  changeMonth(date: Date) {
    this.dateSelected = date;
    this.generateDaysOfMonth();
  }

  eventsForDay(day: number): Event[] {
    const eventsForDay = this.events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === this.dateSelected.getFullYear() &&
        eventDate.getMonth() === this.dateSelected.getMonth() &&
        eventDate.getDate() === day
      );
    });
    return eventsForDay;
  }

  onDrop(event: CdkDragDrop<Event[]>, day: string) {
    const draggedEvent = event.item.data;
    const previousDate = draggedEvent.date.toISOString();
    const currentDate = new Date();
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      parseInt(day)
    );

    this.eventService.moveEvent(
      draggedEvent,
      previousDate,
      newDate.toISOString()
    );

    this.snackBar.open(`Moved to ${newDate.toLocaleDateString()}`, 'Close', {
      duration: 3000,
    });
  }
}
