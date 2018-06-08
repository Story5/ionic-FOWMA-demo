import { Injectable } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FilePath } from '@ionic-native/file-path';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

/*
  Generated class for the SxFileOpenerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SxFileOpenerProvider {

  constructor(
    public document: DocumentViewer,
    public fileOpener: FileOpener,
    public filePath: FilePath,
    public launchNavigator: LaunchNavigator,
  ) {
    
  }

  availableApps() {
    return this.launchNavigator.availableApps();
  }

  resolveNativePath(path) {
    return this.filePath.resolveNativePath(path);
  }

  viewDocument(
    url: string, 
    contentType: string, 
    options: DocumentViewerOptions, 
    onShow?: Function, 
    onClose?: Function, 
    onMissingApp?: Function, 
    onError?: Function): void 
    {
    this.document.viewDocument(url, contentType, options, onShow, onClose, onMissingApp, onError);
  }

  open(filePath:string,fileMIMEType:string) {
    return this.fileOpener.open(filePath,fileMIMEType);
  }

}
