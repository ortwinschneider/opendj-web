import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventDetailPage, EventDetailModalComponent, EventDetailPopoverComponent } from './event-detail.page';

const routes: Routes = [
  {
    path: '',
    component: EventDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EventDetailPage, EventDetailPopoverComponent, EventDetailModalComponent],
  entryComponents: [EventDetailPopoverComponent, EventDetailModalComponent]
})
export class EventDetailPageModule {}
