import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingItemAddPageRoutingModule } from './booking-item-add-routing.module';

import { BookingItemAddPage } from './booking-item-add.page';
import { MaterialModule } from 'src/app/material/material.module';
import { DirectiveModule } from 'src/app/core/directive/directive.module';
import { PipeModule } from 'src/app/core/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BookingItemAddPageRoutingModule,
    MaterialModule,
    DirectiveModule,
    PipeModule,
  ],
  declarations: [BookingItemAddPage]
})
export class BookingItemAddPageModule {}
