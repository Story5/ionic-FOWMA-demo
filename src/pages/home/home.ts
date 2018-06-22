import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SxTipProvider } from '../../providers/sx-tip';
import { Entry, File } from '@ionic-native/file';
import { SxFileHelperProvider } from '../../providers/sx-file-helper/sx-file-helper';

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
    public sxtip: SxTipProvider,
    public sxfilehelper:SxFileHelperProvider,
    public file : File
  ) {

  }

  openPDF() {
    this.saveImg();
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
    this.sxfilehelper.resolveLocalFilesystemUrl(path).then((entry: Entry)=>{
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
    this.sxfilehelper.open(filePath, fileMIMEType).then(success => {
      console.log("success", JSON.stringify(success));
      alert("success" + JSON.stringify(success));
    }).catch(error => {
      console.error("error", JSON.stringify(error));
      alert("error" + JSON.stringify(error));
    });
  }

  //Save Image Function
  saveImg() {
    let imageName = "jpg.jpg";
    const ROOT_DIRECTORY = 'file:///sdcard//';
    const downloadFolderName = 'tempDownloadFolder';

    //Create a folder in memory location
    // this.file.createDir(ROOT_DIRECTORY, downloadFolderName, true)
    //   .then((entries) => {

        //Copy our asset/img/FreakyJolly.jpg to folder we created
        this.file.copyFile(this.file.applicationDirectory + "www/assets/file/", imageName, ROOT_DIRECTORY + downloadFolderName + '//', imageName)
          .then((entries) => {

            //Open copied file in device's default viewer
            this.sxfilehelper.open(ROOT_DIRECTORY + downloadFolderName + "/" + imageName, 'image/jpeg')
              .then(() => console.log('File is opened'))
              .catch(e => alert('open error:' + JSON.stringify(e)));
          })
          .catch((error) => {
            alert('copyFile error:' + JSON.stringify(error));
          });
      // })
      // .catch((error) => {
      //   alert('createDir error:' + JSON.stringify(error));
      // });
  }

}
