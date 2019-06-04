import { MusicEvent } from './../../models/music-event';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController, ToastController, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { EventService } from 'src/app/provider/event.service';

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
    public popoverController: PopoverController,
    public toastController: ToastController,
    public modalController: ModalController,
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

  async join() {

    const toast = await this.toastController.create({
      message: 'You have successfully joined this event',
      position: 'bottom',
      color: 'opendj',
      duration: 2000
    });

    const modal = await this.modalController.create({
      component: EventDetailModalComponent
    });
    modal.onDidDismiss().then(data => {
      toast.present();
    });

    if (this.event.isPublic) {
      toast.present();
    } else {
      return await modal.present();
    }
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.eventService.getEvents()
      .subscribe(data => {
        this.event = data.events.find(obj => obj.id == id);
      });
  }

}

@Component({
  selector: 'app-event-detail-modal',
  template: `
  <ion-header>
    <ion-toolbar color="dark">
      <ion-buttons slot="start">
        <ion-button (click)="dismiss()">
          <ion-icon slot="icon-only" name="close"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>Join private event</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content color="light"></ion-content>
  `
})
export class EventDetailModalComponent implements OnInit {
  constructor(public modalController: ModalController) { }

  dismiss() {
    this.modalController.dismiss();
  }
  ngOnInit() { }
}

@Component({
  selector: 'app-event-detail-popover',
  template: `
  <ion-content>
  <ion-list>
    <ion-list-header>
      <ion-label>Actions</ion-label>
    </ion-list-header>
    <ion-item-divider>
      <ion-label>
        Playlist
      </ion-label>
    </ion-item-divider>
    <ion-item>
      <ion-icon slot="start" color="primary" name="add"></ion-icon>
      <ion-label>New</ion-label>
    </ion-item>
    <ion-item>
      <ion-icon slot="start" color="success" name="musical-notes"></ion-icon>
      <ion-label>Show All</ion-label>
    </ion-item>
    <ion-item [routerLink]="['/list']">
      <ion-icon slot="start" color="success" name="musical-notes"></ion-icon>
      <ion-label>Show Active</ion-label>
    </ion-item>
    <ion-item-divider>
      <ion-label>
        User
      </ion-label>
    </ion-item-divider>
    <ion-item>
      <ion-icon slot="start" color="primary" name="checkmark-circle-outline"></ion-icon>
      <ion-label>Assign Curator</ion-label>
    </ion-item>
    <ion-item>
      <ion-icon slot="start" color="dark" name="people"></ion-icon>
      <ion-label>Show Users</ion-label>
    </ion-item>
    <ion-item-divider>
      <ion-label>
        Event
      </ion-label>
    </ion-item-divider>
    <ion-item>
      <ion-icon slot="start" color="danger" name="create"></ion-icon>
      <ion-label>Edit Event</ion-label>
    </ion-item>
    <ion-item>
      <ion-icon slot="start" color="danger" name="trash"></ion-icon>
      <ion-label>Delete Event</ion-label>
    </ion-item>
  </ion-list>
  <ion-button color="" expand="block">Cancel</ion-button>
</ion-content>
  `
})
export class EventDetailPopoverComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
