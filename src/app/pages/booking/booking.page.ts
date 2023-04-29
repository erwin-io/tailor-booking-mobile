import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import { NewBookingPage } from './new-booking/new-booking.page';
import {map} from 'rxjs/operators';
import { LoaderService } from 'src/app/core/ui-service/loader.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { LoginResult } from 'src/app/core/model/loginresult.model';
import { BookingDetailsPage } from './booking-details/booking-details.page';
import { forkJoin, Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { Staff } from 'src/app/core/model/staff.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingHistoryPage } from './booking-history/booking-history.page';
import { AppConfigService } from 'src/app/core/services/app-config.service';
import { Reservation } from 'src/app/core/model/reservation.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { SuperTabs } from '@ionic-super-tabs/angular';
import { BookingListPagePage } from './booking-list-page/booking-list-page.page';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class BookingPage implements OnInit, AfterViewInit {
  selectedStatus: string[] = ['Pending', 'Approved'];
  currentUser: LoginResult;
  isLoading = false;
  reservationData: Reservation[] = [];
  message = '';
  refreshEvent: any;
  subscription: Subscription;
  activeTabIndex = 1;
  @ViewChild('superTabs') private superTabs: SuperTabs;
  @ViewChild('pendingListPage') private pendingListPage: BookingListPagePage;
  @ViewChild('approvedListPage') private approvedListPage: BookingListPagePage;
  @ViewChild('processedListPage') private processedListPage: BookingListPagePage;

  constructor(private actionSheetController: ActionSheetController,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private cd: ChangeDetectorRef,
    public platform: Platform) {
      this.currentUser = this.storageService.getLoginUser();
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
  
  async ngAfterViewInit() {
    if(this.isAuthenticated) {
      try {
        forkJoin([
          this.pendingListPage.getReservation(this.currentUser.customerId, 'Pending'),
          this.approvedListPage.getReservation(this.currentUser.customerId, 'Approved'),
          this.processedListPage.getReservation(this.currentUser.customerId, 'Processed'),
        ]).toPromise();
      }catch(ex) {
        await this.presentAlert({
          header: 'Try again!',
          message: 'Error loading reseravation',
          buttons: ['OK']
        });
      }
    }
  }

  async ionViewWillEnter(){
      
    const status = this.route.snapshot.queryParamMap.get('status');
    const toOpenReseravtionId = this.route.snapshot.queryParamMap.get('reservationId');
    if(status && status.toLowerCase().includes("approved")) {
      this.activeTabIndex = 1;
      this.superTabs.selectTab(1);
      if(toOpenReseravtionId && toOpenReseravtionId !== "''") {
        await this.approvedListPage.getReservation(this.currentUser.customerId, "Approved");
        const details = this.approvedListPage.reservationData.filter(x=>x.reservationId === toOpenReseravtionId)[0];
        if(details) {
          await this.approvedListPage.onOpenDetails(details);
        }
      }
    }
    else if(status && status.toLowerCase().includes("processed")) {
      this.activeTabIndex = 2;
      this.superTabs.selectTab(2);
      if(toOpenReseravtionId && toOpenReseravtionId !== "''") {
        await this.processedListPage.getReservation(this.currentUser.customerId, "Processed");
        const details = this.processedListPage.reservationData.filter(x=>x.reservationId === toOpenReseravtionId)[0];
        await this.processedListPage.onOpenDetails(details);
      }
    }
    else {
      this.activeTabIndex = 1;
      this.superTabs.selectTab(1);
    }
    this.cd.detectChanges();
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      document.addEventListener('backbutton', (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }, false);
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  segmentChanged(ev: any) {
  }

  async onOpenAdd() {
    this.activeTabIndex = 0;
    this.superTabs.selectTab(0);
    this.cd.detectChanges();
    let modal: any = null;
    modal = await this.modalCtrl.create({
      component: NewBookingPage,
      cssClass: 'modal-fullscreen',
      backdropDismiss: false,
      canDismiss: false,
      componentProps: {
        modal,
        isNew: true,
        currentUser: this.currentUser,
        durationInHours: 1,
       },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      await this.pendingListPage.getReservation(this.currentUser.customerId, 'Pending');
    }
  }



  async doRefreshPending(event){
    try {
      this.refreshEvent = event;
      await this.pendingListPage.getReservation(this.currentUser.customerId, 'Pending').finally(()=> {
  
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

  async doRefreshApproved(event){
    try {
      this.refreshEvent = event;
      await this.approvedListPage.getReservation(this.currentUser.customerId, 'Approved').finally(()=> {
  
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

  async doRefreshProcess(event){
    try {
      this.refreshEvent = event;
      await this.processedListPage.getReservation(this.currentUser.customerId, 'Processed').finally(()=> {
  
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

  async tabChange(event) {
    this.activeTabIndex = event.detail.index;
    this.cd.detectChanges();
  }


  async history() {
    let modal: any = null;
    modal = await this.modalCtrl.create({
      component: BookingHistoryPage,
      cssClass: 'modal-fullscreen',
      componentProps: { currentUser: this.currentUser },
    });
    modal.present();
    await modal.onWillDismiss();
  }

  async presentAlert(options: any) {
    const alert = await this.alertController.create({
      
    });
    await alert.present();
  }
  logout() {
    this.authService.logout();
  }

  isCurrentTab(index) {

  }
}
