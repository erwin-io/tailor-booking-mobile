import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingListPagePage } from './booking-list-page.page';

const routes: Routes = [
  {
    path: '',
    component: BookingListPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingListPagePageRoutingModule {}
