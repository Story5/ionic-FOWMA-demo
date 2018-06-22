import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SxTipProvider } from '../providers/sx-tip';
import { SxFileHelperProvider } from '../providers/sx-file-helper/sx-file-helper';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FileOpener,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SxTipProvider,
    SxFileHelperProvider
  ]
})
export class AppModule {}
