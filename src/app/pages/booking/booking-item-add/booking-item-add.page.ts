import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController, ActionSheetController, Platform } from '@ionic/angular';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { LoginResult } from 'src/app/core/model/loginresult.model';
import { OrderItem, OrderItemType, Reservation } from 'src/app/core/model/reservation.model';
import { AppConfigService } from 'src/app/core/services/app-config.service';
import { OrderItemTypeService } from 'src/app/core/services/order-item-type.service';
import { OrderItemService } from 'src/app/core/services/order-item.service';
import { UserService } from 'src/app/core/services/user.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import { PageLoaderService } from 'src/app/core/ui-service/page-loader.service';
import { BookingDetailsPage } from '../booking-details/booking-details.page';
import { BookingItemAttachmentsPage } from '../booking-item-attachments/booking-item-attachments.page';

@Component({
  selector: 'app-booking-item-add',
  templateUrl: './booking-item-add.page.html',
  styleUrls: ['./booking-item-add.page.scss'],
})
export class BookingItemAddPage implements OnInit {
  modal: HTMLIonModalElement;
  canEdit = false;
  hasChanges = false;
  currentUser: LoginResult;
  isLoading = false;
  isSubmitting = false;
  isLoadingFilter = false;
  details: OrderItem;
  reservation: Reservation;
  orderItemTypeOption: OrderItemType[] = [];
  itemForm: FormGroup;
  orderItemAttachments: any[] = [];


  constructor(private modalCtrl: ModalController,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private platform: Platform,
    private formBuilder: FormBuilder,
    private pageLoaderService: PageLoaderService,
    private storageService: StorageService,
    private userService: UserService,
    private appconfig: AppConfigService,
    private orderItemService: OrderItemService,
      private orderItemTypeService: OrderItemTypeService) {
      this.platform.backButton.subscribeWithPriority(-1, () => {
        this.cancel();
      });
  }
  get isNew(){ return !this.details || !this.details.orderItemId || this.details.orderItemId === "" }


  get formData(){
    return {
      ...this.itemForm.value,
      orderItemId: this.isNew ? null : this.details.orderItemId,
      reservationId: this.isNew ? !this.reservation ? null : this.reservation.reservationId : !this.reservation ? null : this.reservation.reservationId,
      orderItemAttachments: this.orderItemAttachments,
    };
  }

  get errorControls() {
    return this.itemForm.controls;
  }


  initFilter(){
    this.isLoadingFilter = true;
    forkJoin([
      this.orderItemTypeService.getAll(),
  ]).subscribe(
      ([getOrderItemType]) => {
          // do things
          this.orderItemTypeOption = getOrderItemType.data;
      },
      (error) => console.error(error),
      async () => {
        this.isLoadingFilter = false;
        if(this.details && this.details.orderItemId) {
          await this.getOrderItem(this.details.orderItemId);
          this.itemForm.controls['quantity'].setValue(this.details.quantity);
          this.itemForm.controls['remarks'].setValue(this.details.remarks);
        }
        else if(this.details) {
          this.itemForm.controls['orderItemTypeId'].setValue(this.details.orderItemType.orderItemTypeId);
          this.itemForm.controls['quantity'].setValue(this.details.quantity);
          this.itemForm.controls['remarks'].setValue(this.details.remarks);
        }
      }
  )
  }

  ngOnInit() {
    this.itemForm = new FormGroup({
      orderItemTypeId: new FormControl(null, Validators.required),
      quantity: new FormControl(null, [Validators.required, Validators.min(1)]),
      remarks: new FormControl(null, Validators.required)
    });
    this.initFilter();
  }

  async getOrderItem(orderItemId: string) {
    try{
      this.isLoading = true;
      this.orderItemService.getById(orderItemId)
      .subscribe(async res => {
        if(res.success){
          this.details = {...res.data, ...this.details};
          this.isLoading = false;
          this.itemForm.controls['orderItemTypeId'].setValue(res.data.orderItemType.orderItemTypeId);
          this.orderItemAttachments = this.details.orderItemAttachments;
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

  async onSubmit() {
    const params = this.formData;
    try{
      this.isSubmitting = true;
      if(this.isNew) {
        if(this.reservation && this.reservation.reservationId !== '') {
          await this.pageLoaderService.open('Saving item...');
          this.orderItemService.create(params)
          .subscribe(async res => {
            if (res.success) {
              await this.presentAlert({
                header: 'Saved!',
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
        }
        else {
          const data = new OrderItem();
          data.quantity = this.formData.quantity;
          data.orderItemType = this.orderItemTypeOption.filter(x=>x.orderItemTypeId === this.formData.orderItemTypeId)[0];
          data.remarks = this.formData.remarks;
          data.orderItemAttachments = this.formData.orderItemAttachments;
          this.modal.dismiss({success: true, data }, 'confirm');
        }
      }
      else {
        if(this.details && this.details.reservation && this.details.reservation.reservationId !== '') {
          await this.pageLoaderService.open('Saving item...');
          this.orderItemService.update(params)
          .subscribe(async res => {
            if (res.success) {
              await this.presentAlert({
                header: 'Saved!',
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
        } else {
          const data = new OrderItem();
          data.quantity = this.formData.quantity;
          data.orderItemType = this.orderItemTypeOption.filter(x=>x.orderItemTypeId === this.formData.orderItemTypeId)[0];
          data.remarks = this.formData.remarks;
          this.modal.dismiss({success: true, data }, 'confirm');
        }
        
      }
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

  async delete(){
    try{
      await this.pageLoaderService.open('Processing please wait...');
      this.isLoading = true;
      this.orderItemService.delete(this.details.orderItemId)
        .subscribe(async res => {
          if (res.success) {
            this.hasChanges = true;
            await this.pageLoaderService.close();
            await this.presentAlert({
              header: 'Item deleted!',
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

  async onOpenDetails(){
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: BookingDetailsPage,
      cssClass: 'modal-fullscreen',
      componentProps: { details: this.reservation, currentUser: this.currentUser },
    });
    modal.present();
    await modal.onWillDismiss();
  }
  

  async openAttachment() {
    const modal = await this.modalCtrl.create({
      component: BookingItemAttachmentsPage,
      cssClass: 'modal-fullscreen',
      componentProps: { 
        isNew: this.isNew, 
        currentUser: this.currentUser, 
        orderItemAttachments: this.orderItemAttachments && this.orderItemAttachments.length > 0 ? this.orderItemAttachments.sort((a,b) => Number(b.orderItemAttachmentId) - Number(a.orderItemAttachmentId)) : [],
        orderItemId: this.details && this.details.orderItemId ? this.details.orderItemId : null
      },
    });
    modal.present();
    
    await modal.onWillDismiss().then(async (res) => {
      if(res.data) {
        this.orderItemAttachments = res.data;
      }
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(this.hasChanges ? this.hasChanges : null, 'cancel');
  }

  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    await alert.present();
  }
}