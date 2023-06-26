import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { ActionSheetController, AlertController, ModalController, Platform } from '@ionic/angular';
import { ImageViewerPage } from 'src/app/component/image-viewer/image-viewer.page';
import { OrderItemService } from 'src/app/core/services/order-item.service';
import { PageLoaderService } from 'src/app/core/ui-service/page-loader.service';

@Component({
  selector: 'app-booking-item-attachments',
  templateUrl: './booking-item-attachments.page.html',
  styleUrls: ['./booking-item-attachments.page.scss'],
})
export class BookingItemAttachmentsPage implements OnInit {
  isNew = false;
  modal: HTMLIonModalElement;
  orderItemAttachments: any[] = [];
  isLoading = false;
  orderItemId;

  constructor(private modalCtrl: ModalController, 
    private platform: Platform,
    private alertController: AlertController,
    private pageLoaderService: PageLoaderService,
    private orderItemService: OrderItemService,
    private actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

  async onAddPhoto() {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'sched-card-action-sheet',
      buttons: [
        {
          text: 'Camera',
          handler: async () => {
            const image = await Camera.getPhoto({
              quality: 90,
              allowEditing: false,
              resultType: CameraResultType.Uri,
              source: CameraSource.Camera, // Camera, Photos or Prompt!
            });
            if (image) {
              const base64Data = await this.readAsBase64(image);
              const id = this.orderItemAttachments.length > 0 ? this.orderItemAttachments[this.orderItemAttachments.length - 1] : 1;
              const newAttachment = {
                id,
                fileName: `profile-sample-name.${image.format}`,
                data: base64Data,
                url: `data:image/${image.format};base64,${base64Data}`,
                isNew: true
              };
              if(this.orderItemId && this.orderItemId !== "") {
                await this.saveAttachments(newAttachment);
              } else {
                this.orderItemAttachments = [newAttachment, ...this.orderItemAttachments];
              }
            }
            await actionSheet.dismiss();
          },
        },
        {
          text: 'Gallery',
          handler: async () => {
            const image = await Camera.getPhoto({
              quality: 90,
              allowEditing: false,
              resultType: CameraResultType.Uri,
              source: CameraSource.Photos, // Camera, Photos or Prompt!
            });
            if (image) {
              const base64Data = await this.readAsBase64(image);
              const id = this.orderItemAttachments.length > 0 ? this.orderItemAttachments[this.orderItemAttachments.length - 1] : 1;
              const newAttachment = {
                id,
                fileName: `profile-sample-name.${image.format}`,
                data: base64Data,
                url: `data:image/${image.format};base64,${base64Data}`,
                isNew: true
              };
              if(this.orderItemId && this.orderItemId !== "") {
                await this.saveAttachments(newAttachment);
              } else {
                this.orderItemAttachments = [newAttachment, ...this.orderItemAttachments];
              }
            }
            await actionSheet.dismiss();
          },
        },
        {
          text: 'Cancel',
          handler: async () => {
            await actionSheet.dismiss();
          },
        },
      ],
    });
    await actionSheet.present();

  }

  async onRemovePhoto(params) {
    if(params.isNew) {
      this.orderItemAttachments = this.orderItemAttachments.filter(x=>x.id !== params.id);
    } else {
      await this.presentAlert({
        header: 'Are you sure you want to remove this attachment?',
        buttons: [
          {
            text: 'CANCEL',
            role: 'cancel',
          },
          {
            text: 'YES Continue',
            role: 'confirm',
            handler: async () => {
              await this.removePhoto(params);
            },
          },
        ],
      });
    }
  }

  async removePhoto(params) {
    try{
      await this.pageLoaderService.open('Processing please wait...');
      this.isLoading = true;
      this.orderItemService.removeAttachmentFile(params.orderItemAttachmentId)
        .subscribe(async res => {
          if (res.success) {
            await this.pageLoaderService.close();
            await this.presentAlert({
              header: 'Removed!',
              buttons: ['OK']
            });
            this.isLoading = false;
            this.orderItemAttachments = res.data.sort((a,b) => Number(b.orderItemAttachmentId) - Number(a.orderItemAttachmentId));
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

  async done() {
    this.modal.canDismiss = true;
    this.modalCtrl.dismiss(this.orderItemAttachments, 'done');
  }

  async saveAttachments(params) {
    params = {
      ...params,
      orderItemId: this.orderItemId
    }
    try {
      this.isLoading = true;
      await this.pageLoaderService.open('Saving attachment...');
      this.orderItemService.addAttachmentFile(params)
        .subscribe(async res => {
          if (res.success) {
            await this.presentAlert({
              header: 'Saved!',
              buttons: ['OK']
            });
            this.isLoading = false;
            this.orderItemAttachments = res.data.sort((a,b) => Number(b.orderItemAttachmentId) - Number(a.orderItemAttachmentId));
            await this.pageLoaderService.close();
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
    catch(e) {
      await this.pageLoaderService.close();
      this.isLoading = false;
      await this.presentAlert({
        header: 'Try again!',
        message: Array.isArray(e.message) ? e.message[0] : e.message,
        buttons: ['OK']
      });

    }
  }

  async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path,
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      const base64 = (await this.convertBlobToBase64(blob)) as string;
      return base64.split(',')[1];
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  async imageErrorHandler(event) {
    event.target.src = '../../../../assets/img/error_black.png';
  }

  async onViewImage(file) {
    if(file && file.source) {
      const modal = await this.modalCtrl.create({
        component: ImageViewerPage,
        cssClass: 'modal-fullscreen',
        componentProps: { file: { url: file.source} },
      });
      modal.present();
      await modal.onWillDismiss();
    }
  }

  cancel() {
    this.modal.canDismiss = true;
    this.modalCtrl.dismiss(this.orderItemAttachments, 'cancel');
  }

  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    await alert.present();
  }
}
