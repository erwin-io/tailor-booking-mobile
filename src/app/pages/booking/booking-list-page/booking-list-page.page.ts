import { ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { EntityStatusEnum } from 'src/app/core/enums/entity-status.enum';
import { ReservationStatusEnum } from 'src/app/core/enums/reservation-status.enum';
import { LoginResult } from 'src/app/core/model/loginresult.model';
import { OrderItem, Reservation } from 'src/app/core/model/reservation.model';
import { OrderItemService } from 'src/app/core/services/order-item.service';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import { PageLoaderService } from 'src/app/core/ui-service/page-loader.service';
import { BookingDetailsPage } from '../booking-details/booking-details.page';
import { BookingItemAddPage } from '../booking-item-add/booking-item-add.page';

@Component({
  selector: 'app-booking-list-page',
  templateUrl: './booking-list-page.page.html',
  styleUrls: ['./booking-list-page.page.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class BookingListPagePage implements OnInit {
  @Input() status = '';
  @Input() canEdit = false;
  isLoading = false;
  reservationData: Reservation[] = [];
  currentUser: LoginResult;
  constructor(
    private reservationService: ReservationService,
    private storageService: StorageService,
    private orderItemService: OrderItemService,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private router: Router,
    private pageLoaderService: PageLoaderService,
    private actionSheetController: ActionSheetController) {
    this.currentUser = this.storageService.getLoginUser();
    console.log(this.status)
  }

  get isAuthenticated() {
    const currentUser = this.storageService.getLoginUser();
    return currentUser &&
    currentUser.customerId &&
    currentUser.userId &&
    currentUser.accessToken &&
    currentUser.customerId !== '' &&
    currentUser.userId !== '' &&
    currentUser.accessToken !== '';
  }

  ngOnInit() {
  }

  public async getReservation(customerId: string, status: string) {
    try{
      this.isLoading = true;
      this.reservationService.getByStatus({
        customerId,
        reservationStatus: status
      })
      .subscribe(async res => {
        if(res.success){
          this.reservationData = res.data.map(x => {
            x.orderItems = x.orderItems.filter(x=> x.entityStatus.entityStatusId === EntityStatusEnum.ACTIVE.toString())
            return x;
          });
          console.log(res.data);
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
      await this.presentAlert({
        header: 'Try again!',
        subHeader: '',
        message: Array.isArray(e.message) ? e.message[0] : e.message,
        buttons: ['OK']
      });
    }
  }

  async showMenu(details){
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'sched-card-action-sheet',
      buttons: [{
          text: 'Details',
          handler:async () => {
            this.onOpenDetails(details);
            actionSheet.dismiss();
          }
        },
        {
          text: 'Back',
          handler:async () => {
            actionSheet.dismiss();
          }
        }
      ]
    });
    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
  }

  async onOpenDetails(details: Reservation) {
    const modal = await this.modalCtrl.create({
      component: BookingDetailsPage,
      cssClass: 'modal-fullscreen',
      componentProps: { details, currentUser: this.currentUser },
    });
    modal.present();
    await modal.onWillDismiss().then(async (res) => {
      this.router.navigate(['/booking'], { replaceUrl: true });
    });
  }

  async onAddItem(reservation: Reservation) {
    const modal = await this.modalCtrl.create({
      component: BookingItemAddPage,
      cssClass: 'modal-fullscreen',
      componentProps: { reservation, canEdit: true, currentUser: this.currentUser },
    });
    modal.present();
    
    await modal.onWillDismiss().then(async (res) => {
      if(res.data) {
        await this.getReservation(this.currentUser.customerId, this.status);
      }
    });
  }
  
  async onOpenItemDetails(reservation, details: OrderItem) {
    const modal = await this.modalCtrl.create({
      component: BookingItemAddPage,
      cssClass: 'modal-fullscreen',
      componentProps: { details, reservation, canEdit: this.canEdit, currentUser: this.currentUser },
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    
    if (role === 'confirm') {
      await this.getReservation(this.currentUser.customerId, this.status);
    }
  }

  async onRemoveItem(o:OrderItem) {
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
              this.orderItemService.delete(o.orderItemId)
                .subscribe(async res => {
                  if (res.success) {
                    await this.pageLoaderService.close();
                    await this.presentAlert({
                      header: 'Item deleted!',
                      buttons: ['OK']
                    });
                    this.isLoading = false;
                    await this.pageLoaderService.close();
                    await this.getReservation(this.currentUser.customerId, this.status);
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
  
  async cancelReservation(reservationId){
    try{
      await this.presentAlert({
        header: 'Are you sure you want to cancel reservation?',
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
              this.reservationService.updateReservationStatus({
                reservationId,
                reservationStatusId: ReservationStatusEnum.CANCELLED
              })
                .subscribe(async res => {
                  if (res.success) {
                    await this.pageLoaderService.close();
                    await this.presentAlert({
                      header: 'Reservation cancelled!',
                      buttons: ['OK']
                    });
                    this.isLoading = false;
                    await this.getReservation(this.currentUser.customerId, this.status);
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
            }
          }
        ]
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

  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    await alert.present();
  }
}
