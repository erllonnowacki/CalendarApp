import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  eventForm: FormGroup = new FormGroup({});
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dateEvent: ['', Validators.required],
      id: [''],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.eventForm.valid) {
      const novoEvento = {
        id: Date.now(),
        title: this.eventForm.get('title')?.value,
        description: this.eventForm.get('description')?.value,
        date: this.eventForm.get('dateEvent')?.value,
      };
      this.eventService.addEvent(novoEvento);
      this.eventForm.reset();
      this.location.back();
    }
  }

  onCancel() {
    this.location.back();
  }
}
