import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';

import { NavController } from 'ionic-angular';
import * as io from 'socket.io-client';
var a;
var b;
var valv1 = "false";
var valv2 = "false";
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
         //Debug purpose
         //console.log("Luminosità: ", value);
         this.photoValue.push(value);
     });
     this.socket.on('sValue', (value) => {
         this.slideValueBadge.push(value);
         this.rangeSettings = value;
         b = value;
         //Debug purpose
         //console.log("sliderValue:", value); 
     });
     this.socket.on('wateringTime', (value) => {
         wateringTimeDecod = value / 1000;
         this.slideValueBadge.push(wateringTimeDecod);
         this.rangeSettings = wateringTimeDecod;
         //Debug purpose
         //console.log("sliderValue:", value);
     });
  }
  presentLoading() {
      this.loadingCtrl.create({
          content: 'Sto innafiando...',
          duration: b*1000,
          dismissOnPageChange: true
      }).present();
  }

  piantAtt(event, name) {
      if (name._elementRef.nativeElement.id == "valv1") {
          valv1 = name._checked; 
      }
      if (name._elementRef.nativeElement.id == "valv2") {
          valv2 = name._checked;
      }
      console.log(name._checked);
      console.log(name._componentName);
   };

  slampa() {
      this.socket.emit('innafia', b, { "valv1": valv1, "valv2": valv2 });
      this.presentLoading();
  }
  acqua(event, button) {
      console.log(button._elementRef.nativeElement.id);
  };

  cValue(event, nome) {
      //Debug purpose
      //console.log("SliderValue", event._valA);
      this.socket.emit('sValue', event._valA);
  }
}

