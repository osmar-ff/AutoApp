//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MqttServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


declare let MqttClient: any;

@Injectable()
export class MqttServiceProvider {

    public _client: any;

    public _connected: boolean = false;

    public _prefix: string = 'application';
    public _callbacks: any = [];

    constructor() {

    }

    /**
     * Connect to MQTT broker
     *
     * @param callback
     */
    connect(callback?: Function): void {

        if (typeof callback !== 'function') {
            
        }

        this._client = new MqttClient({
            host: 'broker.mqttdashboard.com',
            port: 8000,
            username: 'testando',
            password: 'yellow', 
            will: {
                topic: `${this._prefix}/status`,
                payload: `offline`,
                qos: 2,
                retain: false
            }
        });

        this._client.on('connect', () => {

            

            this._connected = true;

            /* this._client.subscribe(`/#`); */
            /* Comentei acima para evitar muitas msgs */
            /* Inseri abaixo p limitar as minhas msgs */
            this._client.subscribe(`OsmarIME/#`); 

            callback();
        });

        this._client.on('message', (topic, message) => {

            message = message.toString();

            try {
                message = JSON.parse(message);
            } catch (err) {
                // Do nothing
            }

            // notify subscribers
            this._callbacks.forEach(callbackEntry => {

                if (callbackEntry.topic === topic) {

                    callbackEntry.callback(topic, message);
                    console.log('dentro do callback');
                }
            });
            console.log('Recebeu mensagem to subscribers'); 
            console.log(topic);
            console.log(message);
        });

        this._client.on('error', error => {
           
        });

        this._client.on('disconnect', () => {

            this._connected = false;

            this._callbacks = [];

            
        });

        this._client.on('offline', () => {

            this._connected = false;

            this._callbacks = [];

            
        });

        this._client.connect();
    }

    disconnect(callback?: Function): void {

        if (typeof callback !== 'function') {
            
        }

        if (!this._connected) {
            return callback();
        }

        this._client.disconnect();

        this._callbacks = [];

        callback();
    }

    publish(topic: string, message: string, options?: any) {

        
        this._client.publish(topic, message, options);
    }

    subscribe(topic, callback) {

        this._callbacks.push({
            topic: topic,
            callback: callback
        });
    }
}
