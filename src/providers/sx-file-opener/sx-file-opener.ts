import { Injectable } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FilePath } from '@ionic-native/file-path';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { AppAvailability } from '@ionic-native/app-availability';

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
    public appAvailability: AppAvailability,
  ) {
    
  }

  check(app) {
    return this.appAvailability.check(app);
  }

  navigate(destination, options) {
     return this.launchNavigator.navigate(destination,options);
  }

  availableApps() {
    return this.launchNavigator.availableApps();
  }

  isAppAvailable(app:string) {
    return this.launchNavigator.isAppAvailable(app);
  }

  getAppDisplayName(app:string) {
    return this.launchNavigator.getAppDisplayName(app);
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
