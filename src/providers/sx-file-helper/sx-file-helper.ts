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

  downloadFile(url: string,fileName:string,fileType:string) {
    var filePath;
    if (this.platform.is('android')) {
      filePath =
        this.file.externalApplicationStorageDirectory + fileName + "." + fileType;
    } else if (this.platform.is('ios')) {
      filePath =
        this.file.tempDirectory.replace(/^file:\/\//, "") +
        fileName +
        "." +
      fileType;
    } else {
      filePath = this.file.dataDirectory + fileName + "." + fileType;
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
