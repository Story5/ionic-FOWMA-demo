import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {

  }

  checkApp() {

  }

  openPDF() {

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
