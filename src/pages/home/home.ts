import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public conectado:boolean = false;

  constructor(public navCtrl: NavController) {
  }
  public rele = false;

  get lamp(){
    return this.rele ? true : false;
  }

  set lamp(valor){
    this.rele = valor;
  }

  get check(){
    return this.rele ? true : false;
  }

  set check(valor){
    this.rele = valor;
  }

  public logEvent(){
    if (this.conectado){
      this.conectado=false;
    }
    else {
      this.conectado= true;
    }
  }

}
