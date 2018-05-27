import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  aviso() {
    let alert = this.alertCtrl.create({
      title: 'Aviso',
      subTitle: 'Esse recurso está em implementação!',
      buttons: ['OK']
    });
    alert.present();
  }

  set push(valor){
    this.aviso();
  }

  set energy(valor){
    this.aviso();
  }

}
