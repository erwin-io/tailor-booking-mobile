import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingItemAttachmentsPage } from './booking-item-attachments.page';

const routes: Routes = [
  {
    path: '',
    component: BookingItemAttachmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingItemAttachmentsPageRoutingModule {}
