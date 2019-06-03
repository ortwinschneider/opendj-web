import { MusicEvent } from './../../models/music-event';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { EventService } from 'src/app/provider/event.service';
import { EventDetailPopoverComponent } from '../event-detail-popover/event-detail-popover.component';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  public event: any = {};

  constructor(
    public route: ActivatedRoute,
    public eventService: EventService,
    public popoverController: PopoverController
  ) { }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: EventDetailPopoverComponent,
      event: ev,
      translucent: true,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.eventService.getEvents()
      .subscribe(data => {
        this.event = data.events.find(obj => obj.id == id);
      });
  }

}
