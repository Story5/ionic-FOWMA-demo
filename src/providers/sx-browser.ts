import { Injectable } from '@angular/core';
// import { SafariViewController } from '@ionic-native/safari-view-controller';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/*
  Generated class for the SxBrowserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SxBrowserProvider {

  constructor(
    // app 内打开
    // public safariViewController: SafariViewController,
    // 手机浏览器打开
    public iab: InAppBrowser) {
    
  }

  openUrlWithPhoneBrowser(url: string) {
    const browser = this.iab.create(url);
    browser.show()
  }

  // openUrlInApp(url: string) {
  //   this.safariViewController.isAvailable()
  //     .then((available: boolean) => {
  //       if (available) {

  //         this.safariViewController.show({
  //           url: url,
  //           hidden: false,
  //           animated: false,
  //           transition: 'curl',
  //           enterReaderModeIfAvailable: true,
  //           tintColor: '#ff0000'
  //         })
  //           .subscribe((result: any) => {
  //             if (result.event === 'opened') console.log('Opened');
  //             else if (result.event === 'loaded') console.log('Loaded');
  //             else if (result.event === 'closed') console.log('Closed');
  //           },
  //             (error: any) => console.error(error)
  //           );

  //       } else {
  //         // use fallback browser, example InAppBrowser
  //       }
  //     }
  //     );
  // }

}
