import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { MqttServiceProvider } from '../../providers/mqtt-service/mqtt-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public conectado = false;
  public rele = false;

  constructor(public navCtrl: NavController,
              public mqtt: MqttServiceProvider,
              public platform : Platform) {
                this.platform.pause.subscribe(() => {
                  this.mqtt.disconnect();
              });
      
              this.platform.resume.subscribe(() => {
                  this.mqtt.connect();
              });
      
             this.connect();
  }
  
  get lamp(){
    return this.rele ? true : false;
  }

  set lamp(valor){
    this.rele = valor;

    this.mqtt.publish('/OsmarIME/lamp/1', 'tog', {retain: true, qos: 2});
  }

  /*get check(){
    return this.rele ? true : false;
  }

  set check(valor){
    this.rele = valor;
  }
  */

  public logEvent(){
    if (this.conectado){
      this.conectado=false;
    }
    else {
      this.conectado= true;
    }
  }
  connect() {

    this.mqtt.connect(err => {
        if (err) return;

        this.conectado = true;



        this.mqtt.subscribe('/OsmarIME/lamp/1', (topic: string, estado: string) => {

            if (estado == "on") {

                this.rele = true;
            }
            else if (estado == "off"){
              this.rele = false;
            }
            else if (estado == "tog"){
              if (this.rele) {
                this.rele=false;
              }
              else {
                this.rele = true
              }
            }
            
        });
    });
}



disconnect() {

  this.mqtt.disconnect(err => {
      if (err) return;

      this.conectado = false;
  });
}

}
