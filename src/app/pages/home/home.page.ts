import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { Notifications } from 'src/app/core/model/notification.model';
import { Reservation } from 'src/app/core/model/reservation.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import { BookingDetailsPage } from '../booking/booking-details/booking-details.page';
import { SettingsPage } from '../settings/settings.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isLoading = false;
  approvedReservation: Reservation;
  totalApproved = 0;
  processedReservation: Reservation;
  totalProcessed = 0;
  totalUnreadNotification = 0;
  hasChanges = false;
  refreshEvent: any;
  currentUser;
  constructor(
    private router: Router,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private dashboardService: DashboardService,
    private notificationService: NotificationService,
    private storageService: StorageService,
    private alertController: AlertController,
  ) {
    this.currentUser = this.storageService.getLoginUser();


    if(this.isAuthenticated) {
      this.initDashboard(this.currentUser.customerId);
    }
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

  get user() {
    return this.storageService.getLoginUser();
  }

  async initDashboard(customerId){
    this.isLoading = true;
    forkJoin(
      this.dashboardService.getCustomerDashboard({
        customerId
      })
  ).subscribe(
      ([dashboard]) => {
        this.approvedReservation = dashboard && dashboard.data && dashboard.data.approved ? dashboard.data.approved : null;
        this.processedReservation = dashboard && dashboard.data && dashboard.data.processed ? dashboard.data.processed : null;
        this.totalApproved = dashboard && dashboard.data && dashboard.data.totalApproved ? dashboard.data.totalApproved : 0;
        this.totalProcessed = dashboard && dashboard.data && dashboard.data.totalProcessed ? dashboard.data.totalProcessed : 0;
      },
      (error) => console.error(error),
      () => {
        this.isLoading = false;
        this.hasChanges = false;
      }
  );
  }

  ngOnInit() {
  }

  async onOpenDetails(details) {
    const modal = await this.modalCtrl.create({
      component: BookingDetailsPage,
      cssClass: 'modal-fullscreen',
      componentProps: { details, currentUser: this.user },
    });
    modal.present();
    await modal.onWillDismiss();
  }


  async onShowSettings() {

    if(!this.isAuthenticated) {
      this.authService.logout();
    }
    let modal: any = null;
    modal = await this.modalCtrl.create({
      component: SettingsPage,
      cssClass: 'modal-fullscreen',
      backdropDismiss: false,
      canDismiss: true,
      componentProps: { modal },
    });
    modal.present();
    console.log('open settings');
  }

  ionViewWillEnter() {
    console.log('visited');
  }

  async doRefresh(event: any){
    try {
      this.refreshEvent = event;
      await this.initDashboard(this.currentUser.customerId).finally(()=> {
  
        if(this.refreshEvent) {
          this.refreshEvent.target.complete();
          this.refreshEvent = null;
        }
      })
    }catch(ex) {
      await this.presentAlert({
        header: 'Try again!',
        message: 'Error loading reseravation',
        buttons: ['OK']
      });
    }
  }

  profilePicErrorHandler(event) {
    event.target.src = '../../../assets/img/profile-not-found.png';
  }

  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    await alert.present();
  }
}
