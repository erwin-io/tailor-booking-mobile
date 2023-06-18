
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/token.interceptors';
import { CommonModule } from '@angular/common';
import { NavigationPageModule } from './component/navigation/navigation.module';
import { MaterialModule } from './material/material.module';
import { AppConfigService } from './core/services/app-config.service';
import { PageLoaderModule } from './component/page-loader/page-loader.module';
import { DirectiveModule } from './core/directive/directive.module';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { ImageViewerPageModule } from './component/image-viewer/image-viewer.module';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { provideAuth,getAuth, PhoneAuthProvider } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { WindowService } from './core/services/window.service';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    NavigationPageModule,
    HttpClientModule,
    MaterialModule,
    PageLoaderModule,
    DirectiveModule,
    ImageViewerPageModule,
    SuperTabsModule.forRoot(),
    NgxIonicImageViewerModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore())
  ],
  providers: [
    InAppBrowser,
    AndroidPermissions,
    WindowService,  
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide : APP_INITIALIZER,
      multi : true,
      deps : [AppConfigService],
      useFactory : (config: AppConfigService) =>  () => config.loadAppConfig()
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
