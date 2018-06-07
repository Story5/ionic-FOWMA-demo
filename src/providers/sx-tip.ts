import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController, Platform, Loading } from 'ionic-angular';
// import { AppVersion } from '@ionic-native/app-version';

/*
  Generated class for the SxToastControllerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SxTipProvider {
  appName: string = "温馨提示";
  duration: number = 200;

  loader: Loading;
  loadingCount: number = 1;
  tmpCount : number = 1;

  constructor(
    public platform: Platform,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController // public appVersion: AppVersion
  ) {
    platform.ready().then(() => {
      // this.appVersion.getAppName().then(appName => {
      //   this.appName = appName;
      // });
    });
  }

  alert(subTitle: string, cancelText = "确认", cancelHandler = () => {}) {
    this.alertTemplate(subTitle, cancelText, cancelHandler);
  }

  confirmAlert(subTitle: string, confirmText: string = "确认", comfirmHandler) {
    this.alertTemplate(
      subTitle,
      undefined,
      () => {},
      confirmText,
      comfirmHandler
    );
  }

  alertTemplate(
    subTitle?: string,
    cancelText: string = "取消",
    cancelHandler?,
    confirmText: string = "确认",
    comfirmHandler?
  ) {
    var buttons = [{ text: cancelText, handler: cancelHandler }];

    if (comfirmHandler) {
      buttons.push({
        text: confirmText,
        handler: comfirmHandler
      });
    }

    let alert = this.alertCtrl.create({
      title: this.appName,
      subTitle: subTitle,
      buttons: buttons,
      enableBackdropDismiss: false
    });
    alert.present();
  }

  dismissLoading() {
    this.loadingCount--;
    if (this.loadingCount == 0) {
      this.loadingCount = 1;
      this.tmpCount = 1;
      return this.loader.dismiss();
    }
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: this.duration,
      position: "bottom"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
}