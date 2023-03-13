import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingPageRoutingModule } from './booking-routing.module';

import { BookingPage } from './booking.page';
import { MaterialModule } from '../../material/material.module';
import { PipeModule } from 'src/app/core/pipe/pipe.module';
import{ SuperTabsModule } from '@ionic-super-tabs/angular'
import { BookingListPagePageModule } from './booking-list-page/booking-list-page.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BookingPageRoutingModule,
    MaterialModule,
    PipeModule,
    SuperTabsModule,
    BookingListPagePageModule
  ],
  declarations: [BookingPage]
})
export class BookingPageModule {}
