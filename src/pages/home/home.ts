import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SxFileOpenerProvider } from '../../providers/sx-file-opener/sx-file-opener';

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

  constructor(
    public navCtrl: NavController,
    public sxfileopener:SxFileOpenerProvider
  ) {

  }

  checkApp() {

  }

  openPDF() {
    let filePath = "assets/file/pdf.pdf";
    this.sxfileopener.open(filePath, 'application/pdf').then(
      () => {
        console.log('File is opened')
      }).catch(
        e => {
          console.log('Error opening file', e)
          alert(e);
        });
  }

  openOffice(type) {
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

}
