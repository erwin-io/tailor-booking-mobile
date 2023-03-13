import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingHistoryPageRoutingModule } from './booking-history-routing.module';

import { BookingHistoryPage } from './booking-history.page';
import { PipeModule } from 'src/app/core/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingHistoryPageRoutingModule,
    PipeModule
  ],
  declarations: [BookingHistoryPage]
})
export class BookingHistoryPageModule {}
