import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventService } from './services/event.service';
import { CalendarModule } from './components/calendar/calendar.module';
import { CreateEventModule } from './components/create-event/create-event.module';
import { HomeModule } from './components/home/home.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [EventService],
  bootstrap: [AppComponent],
})
export class AppModule {}
