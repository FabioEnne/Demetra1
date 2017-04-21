import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import * as io from 'socket.io-client';
var a;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  socket:any
  chat_input:string;
  chats = [];
  prova = [];
  rangeSettings:number;
  slideValueBadge = [];


  constructor(public navCtrl: NavController) {
   
   this.socket = io('http://localhost:3000');
      this.socket.on('message', (msg) => {
     console.log("message", msg);
     this.chats.push(msg);
   });

   this.socket.on('prova', (msgProva) => {
       console.log("msgProva", msgProva);
       a = msgProva;
       this.rangeSettings = msgProva;
       this.prova.push(msgProva);
   });

   this.socket.on('sValue', (value) => {
       this.slideValueBadge.push(value);
       this.rangeSettings = value;
       console.log("sliderValue:", value);
   });
  }

  send(msg) {
        if(msg != ''){
            this.socket.emit('message', msg);
        }
        this.chat_input = '';
  }
  cValue(event, nome) {
      console.log("SliderValue", event._valA);
      this.socket.emit('sValue', event._valA);
  }
}

