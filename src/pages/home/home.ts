import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';

import { NavController } from 'ionic-angular';
import * as io from 'socket.io-client';
var a;
var b;
var wateringTimeDecod;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  socket:any
  chat_input:string;
  chats = [];
  prova = [];
  photoValue = [];
  rangeSettings:number;
  slideValueBadge = [];

  
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
     this.socket = io('http://2.35.113.223:3000');
     this.socket.on('photo', (value) => {
         console.log("Luminosità: ", value);
         this.photoValue.push(value);
     });
     this.socket.on('sValue', (value) => {
         this.slideValueBadge.push(value);
         this.rangeSettings = value;
         b = value;
         console.log("sliderValue:", value);
     });
     this.socket.on('wateringTime', (value) => {
         wateringTimeDecod = value / 1000;
         this.slideValueBadge.push(wateringTimeDecod);
         this.rangeSettings = wateringTimeDecod;
         console.log("sliderValue:", value);
     });
  }
  presentLoading() {
      this.loadingCtrl.create({
          content: 'Sto innafiando...',
          duration: b*1000,
          dismissOnPageChange: true
      }).present();
  }

  slampa() {
      this.socket.emit('innafia', b);
      this.presentLoading();
  }

  cValue(event, nome) {
      console.log("SliderValue", event._valA);
      this.socket.emit('sValue', event._valA);
  }
}

