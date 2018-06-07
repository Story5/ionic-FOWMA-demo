import { Injectable } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener';

/*
  Generated class for the SxFileOpenerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SxFileOpenerProvider {

  constructor(public fileOpener: FileOpener) {
    
  }

  open(filePath:string,fileMIMEType:string) {
    return this.fileOpener.open(filePath,fileMIMEType);
  }

}
