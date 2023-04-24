import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  onCalendar() {
    this.router.navigate(['calendar'], { relativeTo: this.route });
  }
}
