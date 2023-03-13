import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingPage } from './booking.page';

const routes: Routes = [
  {
    path: '',
    component: BookingPage
  },
  {
    path: 'booking-details',
    loadChildren: () => import('./booking-details/booking-details.module').then( m => m.BookingDetailsPageModule)
  },
  {
    path: 'add-booking',
    loadChildren: () => import('./new-booking/new-booking.module').then( m => m.NewBookingPageModule)
  },
  {
    path: 'booking-history',
    loadChildren: () => import('./booking-history/booking-history.module').then( m => m.BookingHistoryPageModule)
  },
  {
    path: 'booking-list-page',
    loadChildren: () => import('./booking-list-page/booking-list-page.module').then( m => m.BookingListPagePageModule)
  },
  {
    path: 'booking-item-add',
    loadChildren: () => import('./booking-item-add/booking-item-add.module').then( m => m.BookingItemAddPageModule)
  }




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingPageRoutingModule {}
