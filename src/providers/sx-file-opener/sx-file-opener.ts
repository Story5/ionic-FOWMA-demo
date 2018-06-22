import { Injectable } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener';
import { File, Entry } from '@ionic-native/file';

/*
  Generated class for the SxFileOpenerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SxFileOpenerProvider {

  constructor(
    public file:File,
    public fileOpener: FileOpener,
  ) {
    
  }

  open(filePath:string,fileMIMEType:string) {
    return this.fileOpener.open(filePath,fileMIMEType);
  }

  resolveLocalFilesystemUrl(fileUrl: string): Promise<Entry>{
    return this.file.resolveLocalFilesystemUrl(fileUrl);
  }
}
