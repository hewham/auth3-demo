import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-how',
  templateUrl: 'how.page.html',
  styleUrls: ['how.page.scss'],
})
export class HowPage {

  constructor(
    private navCtrl: NavController,
  ) {}

  back() {
    this.navCtrl.navigateRoot('');
  }

}
