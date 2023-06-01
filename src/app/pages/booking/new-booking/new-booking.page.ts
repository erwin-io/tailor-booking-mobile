import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { DomSanitizer } from '@angular/platform-browser';
import { IonModal, IonDatetime, ModalController, AlertController, ActionSheetController, Platform } from '@ionic/angular';
import * as moment from 'moment';
import { forkJoin, Subscription } from 'rxjs';
import { LoginResult } from 'src/app/core/model/loginresult.model';
import { OrderItem, Reservation, ReservationLevel } from 'src/app/core/model/reservation.model';
import { AppConfigService } from 'src/app/core/services/app-config.service';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { PageLoaderService } from 'src/app/core/ui-service/page-loader.service';
import { BookingItemAddPage } from '../booking-item-add/booking-item-add.page';



@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.page.html',
  styleUrls: ['./new-booking.page.scss']
})
export class NewBookingPage implements OnInit {
  @ViewChild('reservationStepper') reservationStepper: MatStepper;
  @ViewChild(IonModal) timeSlotModal: IonModal;
  isNew = false;
  modal: HTMLIonModalElement;
  currentUser: LoginResult;
  name: string;
  details: Reservation = {} as any;
  itemForm: FormGroup;
  reservationForm: FormGroup;
  descriptionForm: FormGroup;
  isSubmitting = false;
  isLoading = false;
  isLoadingFilter = false;
  error: any;
  subscription: Subscription;
  allowToClose = false;
  availableTimeSlot = [];
  orderItems: OrderItem[] = [];
  reservationLevelOptions: ReservationLevel[] = [];

  timeSlotConfig: any = {
    start: '08:00',
    end: '17:00',
    notAvailableHours: ['12:00'],
    durationInHours: 1,
    dayOfWeekNotAvailable: ['Sunday', 'Wednesday', 'Saturday']
  };

  currentDate = new Date();
  minDate: string = new Date(new Date().setDate(this.currentDate.getDate())).toISOString();
  constructor(private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private reservationService: ReservationService,
    private actionSheetController: ActionSheetController,
    private pageLoaderService: PageLoaderService,
    private appconfig: AppConfigService,
    private platform: Platform,
    public sanitizer: DomSanitizer) {
      this.timeSlotConfig.notAvailableHours = this.appconfig.config.reservationConfig.timeSlotNotAvailableHours;
      this.timeSlotConfig.dayOfWeekNotAvailable = this.appconfig.config.reservationConfig.dayOfWeekNotAvailable;
      this.platform.backButton.subscribeWithPriority(-1, () => {
        this.cancel();
      });
      this.initFilter();
  }

  get formData(){
    return {
      ...this.reservationForm.value,
      customerId: this.currentUser.customerId,
      orderItems: this.orderItems.map(x=> {
        return {
          orderItemTypeId: x.orderItemType.orderItemTypeId,
          remarks: x.remarks,
          quantity: x.quantity,
          orderItemAttachments: x.orderItemAttachments
        }
      })
    };
  }

  get errorControls() {
    return this.reservationForm.controls;
  }


  initFilter(){
    this.isLoadingFilter = true;
    forkJoin([
  ]).subscribe(
      ([]) => {
          // do things
      },
      (error) => console.error(error),
      () => {
        this.isLoadingFilter = false;
        this.reservationLevelOptions = this.appconfig.config.lookup.reservationLevel.map(x=> {
          return {
            reservationLevelId: x.reservationLevelId,
            name: x.name
          };
        });
      }
  )
  }

  ngOnInit() {
    this.itemForm = this.formBuilder.group({
    });
    this.reservationForm = this.formBuilder.group({
      reqCompletionDate: [this.minDate, Validators.required],
      reservationLevelId: [null, Validators.required],
      description: [null, Validators.required]
    });
    
    this.allowToClose = true;

    this.subscription = this.platform.backButton.subscribeWithPriority(9999, (e) => {
      if(this.modal.canDismiss){
        this.cancel();
      }
      this.pageLoaderService.close();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  onSelectFocus(control: any, value: any) {
    console.log('click');
    setTimeout(()=>{
      control.setValue(value);
    }, 1000);
  }

  onBack() {
    this.reservationStepper.previous();
  }

  cancel() {
    if(this.reservationStepper.selectedIndex !== 0) {
      this.onBack();
    }else {
      this.modal.canDismiss = true;
      this.modalCtrl.dismiss(null, 'cancel');
    }
  }

  async save(){
    const params = this.formData;
    try{
      await this.pageLoaderService.open('Booking reservation...');
      this.isSubmitting = true;
      this.reservationService.createReservation(params)
        .subscribe(async res => {
          if (res.success) {
            await this.presentAlert({
              header: 'Booked!',
              buttons: ['OK']
            });
            this.isSubmitting = false;
            this.modal.canDismiss = true;
            this.modal.dismiss({success: true, data: res.data}, 'confirm');
            await this.pageLoaderService.close();
          } else {
            await this.pageLoaderService.close();
            this.isSubmitting = false;
            await this.presentAlert({
              header: 'Try again!',
              message: Array.isArray(res.message) ? res.message[0] : res.message,
              buttons: ['OK']
            });
          }
        }, async (err) => {
          await this.pageLoaderService.close();
          this.isSubmitting = false;
          await this.presentAlert({
            header: 'Try again!',
            message: Array.isArray(err.message) ? err.message[0] : err.message,
            buttons: ['OK']
          });
        });
    } catch (e){
      await this.pageLoaderService.close();
      this.isSubmitting = false;
      await this.presentAlert({
        header: 'Try again!',
        message: Array.isArray(e.message) ? e.message[0] : e.message,
        buttons: ['OK']
      });
    }
  }

  async onAddItem() {
    const modal = await this.modalCtrl.create({
      component: BookingItemAddPage,
      cssClass: 'modal-fullscreen',
      componentProps: { canEdit: true, currentUser: this.currentUser },
    });
    modal.present();
    
    await modal.onWillDismiss().then(async (res) => {
      if(res.data) {
        this.orderItems.push(res.data.data);
      }
    });
  }
  
  async onEditItem(index, item: OrderItem) {
    const modal = await this.modalCtrl.create({
      component: BookingItemAddPage,
      cssClass: 'modal-fullscreen',
      componentProps: { details: item, orderItemAttachments: item.orderItemAttachments, canEdit: true, currentUser: this.currentUser },
    });
    modal.present();
    
    await modal.onWillDismiss().then(async (res) => {
      if(res.data) {
        this.orderItems[index] = res.data.data
      }
    });
  }

  async onRemoveItem(o:OrderItem) {
    this.orderItems = this.orderItems.filter(x=> x.orderItemId !== o.orderItemId);
  }

  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    await alert.present();
  }
}
