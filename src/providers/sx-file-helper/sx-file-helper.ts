import { Injectable } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener';
import { File, Entry } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';

/*
  Generated class for the SxFileOpenerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SxFileHelperProvider {

  constructor(
    public platform: Platform,
    public file:File,
    public fileOpener: FileOpener,
    public transfer: FileTransfer
  ) {
    
  }

  open(filePath:string,fileMIMEType:string) {
    return this.fileOpener.open(filePath,fileMIMEType);
  }

  resolveLocalFilesystemUrl(fileUrl: string): Promise<Entry>{
    return this.file.resolveLocalFilesystemUrl(fileUrl);
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
          observe.next(entry.toURL());
        },
        error => {
          // handle error
          observe.error(error);
        }
      );
    })
  }

}
