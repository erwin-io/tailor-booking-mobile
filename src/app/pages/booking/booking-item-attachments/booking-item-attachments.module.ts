import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BookingItemAttachmentsPageRoutingModule } from './booking-item-attachments-routing.module';
import { BookingItemAttachmentsPage } from './booking-item-attachments.page';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingItemAttachmentsPageRoutingModule,
    NgxIonicImageViewerModule
  ],
  declarations: [BookingItemAttachmentsPage]
})
export class BookingItemAttachmentsPageModule {}
