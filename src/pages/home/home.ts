import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SxFileOpenerProvider } from '../../providers/sx-file-opener/sx-file-opener';
import { DocumentViewerOptions } from '@ionic-native/document-viewer';

enum Office {
  Word = 0,
  Excel = 1,
  PowerPoint = 2
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  appList : any = [];

  constructor(
    public platform:Platform,
    public navCtrl: NavController,
    public sxfileopener:SxFileOpenerProvider
  ) {

  }

  checkApp() {
    this.platform.ready().then(()=>{
      this.sxfileopener.availableApps().then((apps:any)=>{
        for (const key in apps) {
          if (apps.hasOwnProperty(key)) {
            const element = apps[key];
            if (element) {
              this.appList.push(key);
            }
          }
        }
        console.log("成功了:", JSON.stringify(apps));
      }).catch(error => {
        console.error("出错了:",JSON.stringify(error));
      })
    })
  }

  openPDF() {
    this.platform.ready().then(()=>{
      let filePath = "assets/file/pdf.pdf";
      this.sxfileopener.resolveNativePath(filePath).then(filePath => {
        console.log("ResolvePath:", filePath);
        alert("ResolvePath:" + filePath);
      })
    })

    // const options: DocumentViewerOptions = {
    //   title: 'My PDF'
    // }

    // this.sxfileopener.viewDocument(
    //   filePath, 
    //   'application/pdf', 
    //   options,
    // )

    
    // this.sxfileopener.open(filePath, 'application/pdf').then(
    //   () => {
    //     console.log('File is opened')
    //   }).catch(
    //     e => {
    //       console.log('Error opening file', e)
    //       alert(JSON.stringify(e));
    //     });
  }

  openOffice(type) {
    switch (type) {
      case Office.Word:
        
        break;
      case Office.Excel:

        break;
      case Office.PowerPoint:

        break;
      default:
        break;
    }
  }

  openDWG() {

  }

}
