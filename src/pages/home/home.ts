import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SxTipProvider } from '../../providers/sx-tip';
import { Entry, File } from '@ionic-native/file';
import { SxFileHelperProvider } from '../../providers/sx-file-helper/sx-file-helper';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SxFileTranferProvider } from '../../providers/sx-file-tranfer';


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
    public file : File,
    public fileTransfer:SxFileTranferProvider
  ) {

  }

  openPDF() {
    console.log("openPDF");
    let path = this.file.applicationDirectory + "www/assets/file/";
    let file = "pdf.pdf"
    console.log(path);
    this.file.checkFile(path,file).then((existed:boolean)=>{
      console.log("checkFile:",existed);
      if (existed) {
        this.openFile(path + file,"*")
      }
    }).catch(error => {
      console.error(JSON.stringify(error));
    });
  }

  openOffice(type) {
    console.log("openOffice");
    var path = this.file.applicationDirectory + "www/assets/file/";
    var file = "";
    var fileMIMEType = "";

    switch (type) {
      case Office.Word:
      {
          path = path + "office/word/";
          file = "doc.doc";
      }
        break;
      case Office.Excel:
      {
          path = path + "office/excel/";
          file = "xls.xls";
      }
        break;
      case Office.PowerPoint:
        {
          path = path + "office/ppt/";
          file = "ppt.ppt";
        }
        break;
      default:
        break;
    }

    
    console.log(path);
    this.file.checkFile(path, file).then((existed: boolean) => {
      console.log("checkFile:", existed);
      if (existed) {
        this.openFile(path + file, "*")
      }
    }).catch(error => {
      console.error(JSON.stringify(error));
    });
  }

  openDWG() {
    console.log("openDWG");

    let path = this.file.applicationDirectory + "www/assets/file/";
    let file = "dwg.dwg"
    console.log(path);
    this.file.checkFile(path, file).then((existed: boolean) => {
      console.log("checkFile:", existed);
      if (existed) {
        this.openFile(path + file, "*")
      }
    }).catch(error => {
      console.error(JSON.stringify(error));
    });
  }

  openAPK() {
    console.log("openAPK");
    let path = this.file.applicationDirectory + "www/assets/file/";
    let file = "apk.apk"
    console.log(path);
    this.file.checkFile(path, file).then((existed: boolean) => {
      console.log("checkFile:", existed);
      if (existed) {
        this.openFile(path + file, "*")
      }
    }).catch(error => {
      console.error(JSON.stringify(error));
    });
  }

  downloadFile() {
    let urlbase = "http://192.168.0.19:8080/files/";
    this.sxtip.presentActionSheet("请选择下载的文件类型", {
      text: 'PDF',
      handler: () => {
        this.fileTransfer.downloadFile(urlbase + "pdf.pdf").subscribe(path => {
          console.log("path:",path);
          alert("downloadFile path:"+path);
        })
      }
    }, {
        text: 'Word',
        handler: () => {
          this.fileTransfer.downloadFile(urlbase + "doc.doc").subscribe(path => {
            console.log("path:", path);
            alert("downloadFile path:" + path);
          })
        }
      }, {
        text: 'Excel',
        handler: () => {
          this.fileTransfer.downloadFile(urlbase + "xls.xls").subscribe(path => {
            console.log("path:", path);
            alert("downloadFile path:" + path);
          })
        }
      }, {
        text: 'PPT',
        handler: () => {
          this.fileTransfer.downloadFile(urlbase + "ppt.ppt").subscribe(path => {
            console.log("path:", path);
            alert("downloadFile path:" + path);
          })
        }
      }, {
        text: 'DWG',
        handler: () => {
          this.fileTransfer.downloadFile(urlbase + "dwg.dwg").subscribe(path => {
            console.log("path:", path);
            alert("downloadFile path:" + path);
          })
        }
      }, {
        text: 'APK',
        handler: () => {
          this.fileTransfer.downloadFile(urlbase + "apk.apk").subscribe(path => {
            console.log("path:", path);
            alert("downloadFile path:" + path);
          })
        }
      })
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
}
