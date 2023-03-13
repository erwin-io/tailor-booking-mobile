import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingItemAddPage } from './booking-item-add.page';

const routes: Routes = [
  {
    path: '',
    component: BookingItemAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingItemAddPageRoutingModule {}
