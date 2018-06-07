import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FileOpener } from '@ionic-native/file-opener';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SxCheckAppProvider } from '../providers/sx-check-app/sx-check-app';
import { SxTipProvider } from '../providers/sx-tip';
import { SxFileOpenerProvider } from '../providers/sx-file-opener/sx-file-opener';

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
    FileOpener,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SxCheckAppProvider,
    SxTipProvider,
    SxFileOpenerProvider
  ]
})
export class AppModule {}
