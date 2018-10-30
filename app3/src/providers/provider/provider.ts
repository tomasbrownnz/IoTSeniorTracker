import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

/*
  Generated class for the Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Provider {
  public mins: number = 0;
  public secs: any;

  public kitchenCount: number = 0;
  public diningCount: number = 0;
  public toiletCount: number = 0;
  public bedroomCount: number = 0;
  public livingCount: number = 0;
  
  public lastMoveLocation: any = "Senior not yet located.";
  public timer: number = 0;

  public batDining: any;
  public batKitchen: any;
  public batLiving: any;
  public batBedroom: any;
  public batToilet: any;


  constructor(public event: Events) {
    console.log('Hello Provider Provider');
    this.setTimer();
  }

  //start the timer
  setTimer(){

    setInterval(function(){
      this.timer++;
      this.mins = Math.floor(this.timer / 60);
      this.secs = this.timer - this.mins * 60;
      if(this.timer == 300){
        self.alert("No motion detected in the last 5 mins ")
        this.event.publish('alert');
      }
    }.bind(this),
    1000)
    
  }

setMessage(message : String) { 
    //If message is for toilet
    if(message.search('toilet') != -1){
      //find battery level
      this.batToilet = message.substring(message.length -2).replace(",", " ");
      var index = message.lastIndexOf(',');
      var movement = message.charAt(index-1).replace(",", " ");
      
      //if movement seen      
      if(movement == '1'){
        //update details
        this.lastMoveLocation = "Toilet";
        this.toiletCount++;
        this.timer = -1;
      }

    }

    //If message is for kitchen
    else if(message.search('kitchen') != -1){
      //find battery level
      this.batKitchen = message.substring(message.length -2).replace(",", " ");
      var index = message.lastIndexOf(',');
      var movement = message.charAt(index-1)
      
      //if movement seen
      if(movement == '1'){
        //update details
        this.timer = -1;
        this.kitchenCount++;
        this.lastMoveLocation = "Kitchen";
      }
      
    }
  //If message is for dining room
    else if(message.search('dining') != -1){
      //find battery level
      this.batDining = message.substring(message.length -2).replace(",", " ");
      var index = message.lastIndexOf(',');
      var movement = message.charAt(index-1)
      
      //if movement seen      
      if(movement == '1'){
        //update details
        this.lastMoveLocation = "Dining Room";
        this.diningCount++
        this.timer = -1;
      }

    }
    //If message is for bedroom
    else if(message.search('bedroom') != -1){
      //find battery level
      this.batBedroom = message.substring(message.length -2).replace(",", " ");
      var index = message.lastIndexOf(',');
      var movement = message.charAt(index-1)
      //if movement seen
      if(movement == '1'){
        //update details
        this.bedroomCount++;
        this.lastMoveLocation = "Bedroom";
        this.timer = -1;
      }

    } 
    //If message is for living room
    else if(message.search('living') != -1){
      //find battery level
      this.batLiving = message.substring(message.length -2).replace(",", " ");
      var index = message.lastIndexOf(',');
      
      //find movement boolean
      var movement = message.charAt(index-1)
      
      //if movement seen
      if(movement == '1'){
        //update details
        this.lastMoveLocation = "Living Room";
        this.livingCount++
        this.timer = -1;
      }

    }
  }
} 