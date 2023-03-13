import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { ModalController, AlertController, ActionSheetController, Platform } from '@ionic/angular';
import * as moment from 'moment';
import { Browser } from 'protractor';
import { ImageViewerPage } from 'src/app/component/image-viewer/image-viewer.page';
import { EntityStatusEnum } from 'src/app/core/enums/entity-status.enum';
import { ReservationStatusEnum } from 'src/app/core/enums/reservation-status.enum';
import { LoginResult } from 'src/app/core/model/loginresult.model';
import { OrderItem, Reservation } from 'src/app/core/model/reservation.model';
import { AppConfigService } from 'src/app/core/services/app-config.service';
import { OrderItemService } from 'src/app/core/services/order-item.service';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { UserService } from 'src/app/core/services/user.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import { PageLoaderService } from 'src/app/core/ui-service/page-loader.service';
import { environment } from 'src/environments/environment';
import { BookingItemAddPage } from '../booking-item-add/booking-item-add.page';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.page.html',
  styleUrls: ['./booking-details.page.scss'],
})
export class BookingDetailsPage implements OnInit {
  hasChanges = false;
  currentUser: LoginResult;
  isLoading = false;
  details: Reservation = {} as any;

  constructor(private modalCtrl: ModalController,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private platform: Platform,
    private pageLoaderService: PageLoaderService,
    private storageService: StorageService,
    private userService: UserService,
    private appconfig: AppConfigService,
    private orderItemService: OrderItemService,
    private reservationService: ReservationService) {
      this.platform.backButton.subscribeWithPriority(-1, () => {
        this.cancel();
      });
  }
  
  ngOnInit() {
    this.getReservation(this.details.reservationId);

  }

  async getReservation(reservationId: string) {
    try{
      this.isLoading = true;
      this.reservationService.getById(reservationId)
      .subscribe(async res => {
        if(res.success){
          this.details = res.data;
          this.details.orderItems = res.data.orderItems.filter(x=> x.entityStatus.entityStatusId === EntityStatusEnum.ACTIVE.toString())
          this.isLoading = false;
        }
        else{
          await this.presentAlert({
            header: 'Try again!',
            subHeader: '',
            message: Array.isArray(res.message) ? res.message[0] : res.message,
            buttons: ['OK']
          });
        }
      }, async (e) => {
        await this.presentAlert({
          header: 'Try again!',
          subHeader: '',
          message: Array.isArray(e.message) ? e.message[0] : e.message,
          buttons: ['OK']
        });
        this.isLoading = false;
      });
    }
    catch(e){
      this.isLoading = false;
      await this.presentAlert({
        header: 'Try again!',
        subHeader: '',
        message: Array.isArray(e.message) ? e.message[0] : e.message,
        buttons: ['OK']
      });
    }
  }

  async onAddItem() {
    const modal = await this.modalCtrl.create({
      component: BookingItemAddPage,
      cssClass: 'modal-fullscreen',
      componentProps: { reservation: this.details, canEdit: true, currentUser: this.currentUser },
    });
    modal.present();
    
    await modal.onWillDismiss().then(async (res) => {
      if(res.data) {
        await this.getReservation(this.details.reservationId);
      }
    });
  }
  
  async onOpenItemDetails(details: OrderItem) {
    const modal = await this.modalCtrl.create({
      component: BookingItemAddPage,
      cssClass: 'modal-fullscreen',
      componentProps: { details, reservation: this.details, canEdit: this.details.reservationStatus.reservationStatusId === ReservationStatusEnum.PENDING.toString(), currentUser: this.currentUser },
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    
    if (role === 'confirm') {
      await this.getReservation(this.details.reservationId);
    }
  }

  async onRemoveItem(orderItemId) {
    try{
      await this.presentAlert({
        header: 'Are you sure you want to remove this item?',
        buttons: [
          {
            text: 'CANCEL',
            role: 'cancel',
          },
          {
            text: 'YES Continue',
            role: 'confirm',
            handler: async () => {
              await this.pageLoaderService.open('Processing please wait...');
              this.isLoading = true;
              this.orderItemService.delete(orderItemId)
                .subscribe(async res => {
                  if (res.success) {
                    await this.pageLoaderService.close();
                    await this.presentAlert({
                      header: 'Item deleted!',
                      buttons: ['OK']
                    });
                    this.isLoading = false;
                    await this.pageLoaderService.close();
                    await this.getReservation(this.details.reservationId);
                  } else {
                    await this.pageLoaderService.close();
                    this.isLoading = false;
                    await this.presentAlert({
                      header: 'Try again!',
                      message: Array.isArray(res.message) ? res.message[0] : res.message,
                      buttons: ['OK']
                    });
                  }
                }, async (err) => {
                  await this.pageLoaderService.close();
                  this.isLoading = false;
                  await this.presentAlert({
                    header: 'Try again!',
                    message: Array.isArray(err.message) ? err.message[0] : err.message,
                    buttons: ['OK']
                  });
                });
            },
          },
        ],
      });
    } catch (e){
      await this.pageLoaderService.close();
      this.isLoading = false;
      await this.presentAlert({
        header: 'Try again!',
        message: Array.isArray(e.message) ? e.message[0] : e.message,
        buttons: ['OK']
      });
    }
  }

  async onCancelReservation() {
    await this.presentAlert({
      header: 'Are you sure you want to cancel reservation?',
      buttons: [
        {
          text: 'BACK',
          role: 'cancel',
        },
        {
          text: 'YES',
          role: 'confirm',
          handler: async () => {
            this.cancelReservation();
          },
        },
      ],
    });
  }

  async cancelReservation(){
    try{
      await this.pageLoaderService.open('Processing please wait...');
      this.isLoading = true;
      this.reservationService.updateReservationStatus({
        reservationId: this.details.reservationId,
        reservationStatusId: ReservationStatusEnum.CANCELLED
      })
        .subscribe(async res => {
          if (res.success) {
            this.hasChanges = true;
            await this.pageLoaderService.close();
            await this.presentAlert({
              header: 'Reservation cancelled!',
              buttons: ['OK']
            });
            this.isLoading = false;
            return this.modalCtrl.dismiss(true, 'confirm');
          } else {
            await this.pageLoaderService.close();
            this.isLoading = false;
            await this.presentAlert({
              header: 'Try again!',
              message: Array.isArray(res.message) ? res.message[0] : res.message,
              buttons: ['OK']
            });
          }
        }, async (err) => {
          await this.pageLoaderService.close();
          this.isLoading = false;
          await this.presentAlert({
            header: 'Try again!',
            message: Array.isArray(err.message) ? err.message[0] : err.message,
            buttons: ['OK']
          });
        });
    } catch (e){
      await this.pageLoaderService.close();
      this.isLoading = false;
      await this.presentAlert({
        header: 'Try again!',
        message: Array.isArray(e.message) ? e.message[0] : e.message,
        buttons: ['OK']
      });
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(this.hasChanges ? this.hasChanges : null, 'cancel');
  }

  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    await alert.present();
  }

}
