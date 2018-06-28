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
  filePath : string = "";
  

  constructor(
    public platform:Platform,
    public navCtrl: NavController,
    public sxtip: SxTipProvider,
    public file: File,
    public sxfilehelper:SxFileHelperProvider,
  ) {

  }

  openPDF() {
    console.log("openPDF");
    let file = "pdf.pdf"
    if (this.filePath && this.filePath.length > 0) {
      this.openFile(this.filePath, "*");
    } else {
      let path = this.file.applicationDirectory + "www/assets/file/";
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

    if (this.filePath && this.filePath.length > 0) {
      this.openFile(this.filePath, "*");
    } else {
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
  }

  openDWG() {
    console.log("openDWG");

    if (this.filePath && this.filePath.length > 0) {
      this.openFile(this.filePath, "*");
    } else {
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

  downloadFileWithUrl(url, fileType) {
    var uri = encodeURI(url);
    console.log("url:",url);
    console.log("uri:", uri);
    var fileName = fileType
    this.sxfilehelper.downloadFile(uri,fileName,fileType).subscribe((path:string) => {
      console.log("path:", path);
      alert("downloadFile success path:" + path);
      this.filePath = path;
    },error => {
      console.log("error:", JSON.stringify(error));
      alert("error:" + JSON.stringify(error));
    })
  }

  downloadFile() {
    let urlbase = "http://192.168.0.19:8080/files/";
    this.sxtip.presentActionSheet("请选择下载的文件类型", {
      text: 'PDF',
      handler: () => {
        let url = "https://102.alibaba.com/downloadFile.do?file=1520478361732/Android_v9.pdf";
        this.downloadFileWithUrl(url,"pdf");
      }
    }, {
        text: 'DOCX',
        handler: () => {
          let url = "http://101.231.116.46:10162/uploadfiles/201812916272173299837.docx";
          this.downloadFileWithUrl(url,"docx");
        }
      }, {
        text: 'XLS',
        handler: () => {
          let url = "http://101.231.116.46:10162/uploadfiles/xls.xls";
          this.downloadFileWithUrl(url,"xls");
        }
      }, {
        text: 'XLSX',
        handler: () => {
          let url = "http://101.231.116.46:10162/uploadfiles/xlsx.xlsx";
          this.downloadFileWithUrl(url, "xlsx");
        }
      }, {
        text: 'PPT',
        handler: () => {
          let url = urlbase + "ppt.ppt";
          this.downloadFileWithUrl(url,"ppt");
        }
      }, {
        text: 'DWG',
        handler: () => {
          let url = "http://101.231.116.46:10162/uploadfiles/201792887451274122749.dwg";
          this.downloadFileWithUrl(url,"dwg");
        }
      }, {
        text: 'APK',
        handler: () => {
          let url = urlbase + "apk.apk";
          this.downloadFileWithUrl(url,"apk");
        }
      }, {
        text: 'JPG',
        handler: () => {
          let url = urlbase + "jpg.jpg";
          this.downloadFileWithUrl(url,"jpg");
        }
      },{
        text:'PNG',
        handler:()=>{
          let url = "http://101.231.116.46:10162/admin/common/getfile.aspx?file=2018641640531980432065&sign=";
          this.downloadFileWithUrl(url,"png");
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

  getCurrentTime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let time =
      year * Math.pow(10, 10) +
      month * Math.pow(10, 8) +
      day * Math.pow(10, 6) +
      hour * Math.pow(10, 4) +
      minute * 100 +
      second;

    return String(time);
  }
}
