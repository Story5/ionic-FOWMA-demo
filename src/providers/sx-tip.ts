import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController, Platform, Loading, ActionSheetController } from 'ionic-angular';
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
    public actionSheetCtrl:ActionSheetController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController // public appVersion: AppVersion
  ) {
    platform.ready().then(() => {
      // this.appVersion.getAppName().then(appName => {
      //   this.appName = appName;
      // });
    });
  }

  presentActionSheet(title,...rest:any[]) {
    let buttons = rest.concat({
      text: '取消',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    })
    const actionSheet = this.actionSheetCtrl.create({
      title: 'title',
      buttons: buttons
    });
    actionSheet.present();
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

  showPrompt(title,message,inputsName,inputsPlaceholder,confirmHandler) {
    const prompt = this.alertCtrl.create({
      title: title,
      message: message,
      inputs: [
        {
          name: inputsName,
          placeholder: inputsPlaceholder
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: confirmHandler
        }
      ]
    });
    prompt.present();
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