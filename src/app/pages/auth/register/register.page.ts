/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MyErrorStateMatcher } from '../../../core/form-validation/error-state.matcher';
import { PageLoaderService } from 'src/app/core/ui-service/page-loader.service';
import { AppConfigService } from 'src/app/core/services/app-config.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterPage implements OnInit {
  isSubmitting = false;
  registerForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  defaultDate = new Date();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appconfig: AppConfigService,
    private authService: AuthService,
    private pageLoaderService: PageLoaderService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName : [null, Validators.required],
      middleName : [null],
      lastName : [null, Validators.required],
      email : [null, Validators.required],
      mobileNumber : [null, [ Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(11), Validators.maxLength(11)]],
      address : [null, Validators.required],
      birthDate : [this.defaultDate.toISOString(), Validators.required],
      genderId : [null, Validators.required],
      username : [null, Validators.required],
      password : [null, Validators.required],
      confirmPassword : '',
    }, { validators: this.checkPasswords });
  }

  get controls() {
    return this.registerForm.controls;
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  };

  async onFormSubmit(form: any) {
    const params = {
      ...form
    }
    params.mobileNumber = params.mobileNumber.toString().padStart(11, '0');
    if(!this.registerForm.valid){
      return;
    }
    try{
      this.isSubmitting = true;
      await this.pageLoaderService.open('Processing please wait...');
      this.authService.createUserVerification(params)
      .subscribe(async res => {
        if (res.success) {
          await this.presentAlert({
            header: 'Saved!',
            buttons: [
              {
                text: 'Ok',
                handler: async ()=> {
                  await this.pageLoaderService.close();
                },
              },
            ]
          }).then(async () =>{
            this.isSubmitting = false;
          });
          await this.pageLoaderService.close();
          
          const navigationExtras: NavigationExtras = {
            state: {
              data: JSON.stringify(params)
            }
          };
          this.router.navigate(['verify-otp'], navigationExtras);
          await this.pageLoaderService.close();
          
          this.isSubmitting = false;
        } else {
          this.isSubmitting = false;
          await this.presentAlert({
            header: 'Try again!',
            message: Array.isArray(res.message) ? res.message[0] : res.message,
            buttons:  [
              {
                text: 'Ok',
                handler: async ()=> {
                  await this.pageLoaderService.close();
                },
              },
            ]
          });
        }
      }, async (err) => {
        this.isSubmitting = false;
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
}
