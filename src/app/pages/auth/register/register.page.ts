/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController, IonModal, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MyErrorStateMatcher } from '../../../core/form-validation/error-state.matcher';
import { PageLoaderService } from 'src/app/core/ui-service/page-loader.service';
import { AppConfigService } from 'src/app/core/services/app-config.service';
import { Auth, RecaptchaVerifier, signInWithPhoneNumber } from '@angular/fire/auth';
import { FirebaseAuthService } from 'src/app/core/services/firebase-auth.service';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { LoginResult } from 'src/app/core/model/loginresult.model';
import { StorageService } from 'src/app/core/storage/storage.service';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  isSubmitting = false;
  registerForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  defaultDate = new Date();
  otpCtrl = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
  @ViewChild("verifyNumberModal") verifyNumberModal: IonModal;
  otpConfig:NgOtpInputConfig = {
    length: 6,
    allowNumbersOnly: true,
    inputClass: "otp-input-style",
    containerClass: ""
  };
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appconfig: AppConfigService,
    private animationCtrl: AnimationController,
    private authService: AuthService,
    private firebaseAuthService: FirebaseAuthService,
    private pageLoaderService: PageLoaderService,
    private storageService: StorageService,
    private alertController: AlertController) { }

  ngOnInit() {
    const draft = localStorage.getItem("register-draft");
    let data = draft ? JSON.parse(draft) : null;
    if(!data){
      data = {
        //testing model 
        //comment for prod
        // firstName: 'Customer2', 
        // // middleName: '', 
        // lastName: 'Customer2', 
        // email: 'customer2@gmail.com', 
        // mobileNumber: '09950431207', 
        // address: 'PH', 
        // genderId: '1', 
        // username: 'customer2', 
        // password: '123456', 
        // confirmPassword: '123456'
        //end
      } as any;
    }
    const { firstName, middleName, lastName, email, mobileNumber, address, birthDate, genderId, username, password, confirmPassword } = data;
    this.registerForm = this.formBuilder.group({
      firstName : [firstName, Validators.required],
      middleName : [middleName],
      lastName : [lastName, Validators.required],
      email : [email, Validators.required],
      mobileNumber : [mobileNumber, [ Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(11), Validators.maxLength(11)]],
      address : [address, Validators.required],
      birthDate : [this.defaultDate.toISOString(), Validators.required],
      genderId : [genderId, Validators.required],
      username : [username, Validators.required],
      password : [password, Validators.required],
      confirmPassword : confirmPassword,
    }, { validators: this.checkPasswords });
  }

  get controls() {
    return this.registerForm.controls;
  }

  get formData() {
    return this.registerForm.value;
  }

  get isVerifying() {
    if(!this.firebaseAuthService) {
      return false;
    } else if(!this.firebaseAuthService.appVerifier) {
      return false;
    } else {
      return !this.firebaseAuthService.appVerifier.destroyed
    }
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  };

  async verify() {
    this.isSubmitting = true;
    if(this.otpCtrl.dirty || this.otpCtrl.valid) {
      this.otpCtrl.setErrors(null);
    }
    try {
      if(!this.registerForm.valid){
        this.isSubmitting = false;
        return;
      }

      const { username, email, mobileNumber } = this.formData;
      
      await this.pageLoaderService.open('Processing please wait...');
      const checkIfExist: {  data: any } [] = await forkJoin([
        this.authService.findByUsername(username),
        this.authService.findByEmail(email),
        this.authService.findByMobileNumber(mobileNumber),
      ]).toPromise();
      console.log(checkIfExist);
      if(checkIfExist[0].data) {
        await this.presentAlert({
          header: 'Username already exist!',
          buttons: [
            {
              text: 'Ok',
              handler: async ()=> {
                this.isSubmitting = false;
                await this.pageLoaderService.close();
              },
            },
          ]
        });
        this.isSubmitting = false;
        return;
      } else if(checkIfExist[1].data) {
        await this.presentAlert({
          header: 'Email already in use!',
          buttons: [
            {
              text: 'Ok',
              handler: async ()=> {
                this.isSubmitting = false;
                await this.pageLoaderService.close();
              },
            },
          ]
        });
        this.isSubmitting = false;
        return;
      } else if(checkIfExist[2].data) {
        await this.pageLoaderService.close();
        await this.presentAlert({
          header: 'Mobile number already in use!',
          buttons: [
            {
              text: 'Ok',
              handler: async ()=> {
                this.isSubmitting = false;
                await this.pageLoaderService.close();
              },
            },
          ]
        });
        this.isSubmitting = false;
      }
      
      const phoneNumber = '+63' + Number(this.formData.mobileNumber);
      const response = await this.firebaseAuthService.signInWithPhoneNumber(phoneNumber)
      console.log(response);

      this.verifyNumberModal.dismiss();
      this.openVerifyModal();
      this.isSubmitting = false;
    } catch(ex) {
      await this.pageLoaderService.close();
      this.isSubmitting = false;
      this.verifyNumberModal.dismiss();
      this.firebaseAuthService.appVerifier.clear();
      console.log(ex);
      // window.location.reload()
      let message = "Try again later.";
      if(ex?.message.includes("Firebase: Error") && ex?.message.includes("too-many-requests")) {
        message = "Too many request. Please wait for 5 minuets before you try again";
      } else if(ex?.message.includes("Firebase: Error") && ex?.message.includes("too-many-requests")) {
        message = "Error verifying account. Please try again for a few minuets";
      }
      await this.presentAlert({
        header: 'Something went wrong!',
        message: message,
        buttons: [
          {
            text: 'Ok',
            handler: async ()=> {
              this.isSubmitting = false;
              await this.pageLoaderService.close();
            },
          },
        ]
      });
      await this.refreshPage();
    }
  }

  async openVerifyModal() {
    try {
      const { enterAnimation, leaveAnimation } = {
        enterAnimation: (baseEl: HTMLElement) => {
          const root = baseEl.shadowRoot;
          const backdropAnimation = this.animationCtrl
            .create()
            .addElement(root.querySelector('ion-backdrop')!)
            .fromTo('opacity', '0.01', '0.8');
        
            const wrapperAnimation = this.animationCtrl
            .create()
            .addElement(root.querySelector('.modal-wrapper')!)
            .keyframes([
            { offset: 0, transform: 'translateY(100%)', opacity: '0.8' },
            { offset: 1, transform: 'translateY(0)', opacity: '1'  },
            ]);
            return this.animationCtrl
            .create()
            .addElement(baseEl)
            .easing('ease-out')
            .duration(200)
            .addAnimation([backdropAnimation, wrapperAnimation]);
        },
        leaveAnimation: (baseEl: HTMLElement) => {
          return enterAnimation(baseEl).direction('reverse');
        }
      };
      this.verifyNumberModal.enterAnimation = enterAnimation;
      this.verifyNumberModal.leaveAnimation = leaveAnimation;
      this.verifyNumberModal.present();
    } catch(ex) {
      this.isSubmitting = false;
      throw ex;
    }
  }
  
  async resend() {
    try {
      this.isSubmitting = true;
      await this.pageLoaderService.open('Processing please wait...');
      const phoneNumber = '+63' + Number(this.formData.mobileNumber);
      const response = await this.firebaseAuthService.signInWithPhoneNumber(phoneNumber)
      this.verifyNumberModal.dismiss();
      console.log(response);       
    } catch(ex) {
      await this.pageLoaderService.close();
      this.isSubmitting = false;
      this.verifyNumberModal.dismiss();
      // this.firebaseAuthService.appVerifier.clear();
      console.log(ex);
      // window.location.reload()
      let message = "Try again later.";
      if(ex?.message.includes("Firebase: Error") && ex?.message.includes("too-many-requests")) {
        message = "Too many request. Please wait for 5 minuets before you try again";
      } else if(ex?.message.includes("Firebase: Error") && ex?.message.includes("too-many-requests")) {
        message = "Error verifying account. Please try again for a few minuets";
      }
      await this.presentAlert({
        header: 'Something went wrong!',
        message: message,
        buttons: [
          {
            text: 'Ok',
            handler: async ()=> {
              this.isSubmitting = false;
              await this.pageLoaderService.close();
            },
          },
        ]
      });
      await this.refreshPage();
    }
  }
  
  async verifyOtp() {
    this.isSubmitting = true;
    if(!this.otpCtrl.valid) {
      this.otpConfig.containerClass = "invalid";
      this.isSubmitting = false;
      return;
    } 
    this.otpConfig.containerClass = "";
    console.log(this.otpCtrl.value);
    try {
      
      await this.pageLoaderService.open('Verifying please wait...');
      const response = await this.firebaseAuthService.verifyOtp(this.otpCtrl.value);
      console.log(response);    
      this.isSubmitting = false;

      await this.register();

    } catch(e) {
      this.isSubmitting = false;
      console.log(e);
      this.otpCtrl.setErrors(null);
      this.otpCtrl.setErrors({ invalid: true});
      this.otpConfig.containerClass = "invalid";
    }
  }

  async register() {
    this.isSubmitting = true;
    const params = this.formData;
    params.mobileNumber = params.mobileNumber.toString().padStart(11, '0');
    try{
      this.isSubmitting = true;
      await this.pageLoaderService.open('Saving your account please wait...');
      this.authService.register(params)
      .subscribe(async res => {
        if (res.success) {
          await this.pageLoaderService.close();
          await this.presentAlert({
            header: 'Saved!',
            buttons: [
              {
                text: 'Ok',
                handler: async ()=> {
                  this.isSubmitting = false;
                  await this.pageLoaderService.close();
                },
              },
            ]
          }).then(async () =>{
            this.isSubmitting = false;
          });
          await this.pageLoaderService.close();
          this.verifyNumberModal.dismiss();
          
          const logRes = await this.authService.login(params).toPromise();
          
          this.storageService.saveRefreshToken(logRes.data.accessToken);
          this.storageService.saveAccessToken(logRes.data.refreshToken);
          this.storageService.saveTotalUnreadNotif(logRes.data.totalUnreadNotif);
          // const today = new Date();
          // today.setTime(today.getTime() + this.sessionTimeout * 1000);
          // this.storageService.saveSessionExpiredDate(today);
          const userData: LoginResult = logRes.data;
          this.storageService.saveLoginUser(userData);
          localStorage.removeItem("register-draft");
          window.location.href = "/";
          
          this.isSubmitting = false;
        } else {
          this.isSubmitting = false;
          this.verifyNumberModal.dismiss();
          await this.presentAlert({
            header: 'Try again!',
            message: Array.isArray(res.message) ? res.message[0] : res.message,
            buttons:  [
              {
                text: 'Ok',
                handler: async ()=> {
                  this.isSubmitting = false;
                  await this.pageLoaderService.close();
                },
              },
            ]
          });
        }
      }, async (err) => {
        this.isSubmitting = false;
        this.verifyNumberModal.dismiss();
        await this.presentAlert({
          header: 'Try again!',
          message: Array.isArray(err.message) ? err.message[0] : err.message,
          buttons: [
            {
              text: 'Ok',
              handler: async ()=> {
                await this.pageLoaderService.close();
              },
            },
          ]
        });
      });
      
    } catch (e){
      await this.pageLoaderService.close();
      this.isSubmitting = false;
      await this.presentAlert({
        header: 'Try again!',
        message: Array.isArray(e.message) ? e.message[0] : e.message,
        buttons: [
          {
            text: 'Ok',
            handler: async ()=> {
              await this.pageLoaderService.close();
            },
          },
        ]
      });
    }
  }

  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    return await alert.present();
  }

  async refreshPage() {
    const params = this.formData;
    const data = JSON.stringify(params);
    localStorage.setItem("register-draft", data);
  }
}
