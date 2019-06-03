import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventDetailPage } from './event-detail.page';
import { EventDetailPopoverComponent } from '../event-detail-popover/event-detail-popover.component';

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
  declarations: [EventDetailPage, EventDetailPopoverComponent],
  entryComponents: [EventDetailPopoverComponent]
})
export class EventDetailPageModule {}
