import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Platform } from 'ionic-angular/umd';
import { File } from '@ionic-native/file';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the SxFileTranferProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SxFileTranferProvider {

  constructor(
    public platform:Platform,
    public file:File,
    public transfer: FileTransfer) {
    
  }

  downloadFile(url: string) {
    let format = url.split(".").pop();

    var filePath;
    let fileName = this.getCurrentTime();
    if (this.platform.is('android')) {
      filePath =
        this.file.externalApplicationStorageDirectory + fileName + "." + format;
    } else {
      filePath =
        this.file.tempDirectory.replace(/^file:\/\//, "") +
        fileName +
        "." +
        format;
    }

    const fileTransfer: FileTransferObject = this.transfer.create();

    return new Observable(observe => {
      fileTransfer.download(url, filePath).then(
        entry => {
          console.error("download complete:", entry.toURL());
          alert("download complete: " + entry.toURL());
          observe.next(entry.toURL());
        },
        error => {
          // handle error
          console.error("download error:",JSON.stringify(error));
          alert(error);
          observe.error(error);
        }
      );
    })
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
