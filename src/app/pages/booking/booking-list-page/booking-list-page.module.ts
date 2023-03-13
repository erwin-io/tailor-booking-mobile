import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingListPagePageRoutingModule } from './booking-list-page-routing.module';

import { BookingListPagePage } from './booking-list-page.page';
import { PipeModule } from 'src/app/core/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingListPagePageRoutingModule,
    PipeModule
  ],
  exports: [BookingListPagePage],
  declarations: [BookingListPagePage]
})
export class BookingListPagePageModule {}
