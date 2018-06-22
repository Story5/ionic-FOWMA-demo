import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SxFileOpenerProvider } from '../../providers/sx-file-opener/sx-file-opener';
import { SxTipProvider } from '../../providers/sx-tip';
import { Entry } from '@ionic-native/file';

enum FileMIMEType {
  MIME_PDF = "application/pdf",

  MIME_DOC = "application/msword",
  MIME_DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  MIME_XLS = "application/vnd.ms-excel",
  MIME_XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

  MIME_PPT = "application/vnd.ms-powerpoint",
  MIME_PPTX = "application/vnd.openxmlformats-officedocument.presentationml.presentation",

  MIME_DWG = "image/vnd.dwg",
  MIME_APK = "application/vnd.android.package-archive",
}

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
    public sxfileopener:SxFileOpenerProvider,
    public sxtip:SxTipProvider,
  ) {

  }

  openPDF() {
    
  }

  openOffice(type) {
    var path = "";
    var fileMIMEType = "";

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
    
    var path = "assets/file/dwg.dwg";
    path = decodeURI(path);
    console.log("decodeURI:",path);
    this.sxfileopener.resolveLocalFilesystemUrl(path).then((entry: Entry)=>{
      console.log("resolve1-fullPath:" + entry.fullPath);
      console.log("resolve1-nativeURL:" + entry.nativeURL);
    }).catch(error => {
      console.error(JSON.stringify(error));
    });
    var fileMIMEType = FileMIMEType.MIME_DWG;
    this.openFile(path,fileMIMEType)
  }

  openAPK() {
    var path = "assets/file/apk.apk";
    var fileMIMEType = FileMIMEType.MIME_APK;
    this.openFile(path, fileMIMEType)
  }

  openFile(filePath: string, fileMIMEType: string) {
    this.sxfileopener.open(filePath, fileMIMEType).then(success => {
      console.log("success", JSON.stringify(success));
      alert("success" + JSON.stringify(success));
    }).catch(error => {
      console.error("error", JSON.stringify(error));
      alert("error" + JSON.stringify(error));
    });
  }

}
