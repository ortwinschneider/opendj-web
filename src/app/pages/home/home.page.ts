import { MusicEvent } from './../../models/music-event';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../providers/event.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  events: [MusicEvent];

  constructor(
    public eventService: EventService,
    public router: Router
  ) { }

  ngOnInit() {
    this.eventService.getEvents()
      .subscribe(data => {
        this.events = data.events;
      });
  }

}
