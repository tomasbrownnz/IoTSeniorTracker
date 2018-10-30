import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { Provider } from '../../providers/provider/provider';
import { h337 } from 'heatmap.js';
import { Chart } from 'chart.js';
import { AboutPage } from '../about/about';

declare var Paho : any;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('roomBarCanvas') roomBarCanvas;

  private mqttStatus: string = 'Disconnected';
  private mqttClient: any = null;
  private message: any = '';
  private messageToSend: string = 'Your message';
  private topic: string = 'swen325/a3';
  private clientId: string = 'browntoma'

  doughnutChart: any;

  constructor(public navCtrl: NavController, public provider: Provider, public event: Events) {
  }

  ionViewDidLoad(){
	  this.  doughnutChart = new Chart(this.roomBarCanvas.nativeElement, {
 
		type: 'doughnut',
		data: {
			labels: ["Bedroom", "Toilet", "Dining room", "Living Room", "Kicthen"],
			datasets: [{
				label: '# of Votes',
				data: [
				  this.provider.bedroomCount, 
				  this.provider.toiletCount,
				  this.provider.diningCount, 
				  this.provider.livingCount,
				  this.provider.kitchenCount
				  ],
				backgroundColor: [
					'rgba(5, 168, 170, 0.5)',
					'rgba(98, 71, 170, 0.5)',
					'rgba(255, 231, 76, 0.5)',
					'rgba(218, 107, 224, 0.5)',
					'rgba(11, 147, 237, 0.5)'
				],
				hoverBackgroundColor: [
					'rgba(5, 168, 170, 1)',
					'rgba(98, 71, 170, 1)',
					'rgba(255, 231, 76, 1)',
					'rgba(218, 107, 224, 1)',
					'rgba(11, 147, 237, 1)'
				]
			}]
		}
  
	});
  }


  public connect = () => {
  	this.mqttStatus = 'Connecting...';
  	this.mqttClient = new Paho.MQTT.Client('barretts.ecs.vuw.ac.nz', 8883, '/mqtt', this.clientId);
 	
	// set callback handlers
	this.mqttClient.onConnectionLost = this.onConnectionLost;
	this.mqttClient.onMessageArrived = this.onMessageArrived;

	// connect the client
	console.log('Connecting to mqtt via websocket');
	this.mqttClient.connect({timeout:10, useSSL:false, onSuccess:this.onConnect, onFailure:this.onFailure});
	this.provider.timer = -1;
  }

  public disconnect () {
  	if(this.mqttStatus == 'Connected') {
  		this.mqttStatus = 'Disconnecting...';
  		this.mqttClient.disconnect();
		  this.mqttStatus = 'Disconnected';
  	}
  }

  public sendMessage () {
  	if(this.mqttStatus == 'Connected') {
  		this.mqttClient.publish(this.topic, this.messageToSend);
  	}
  }

  public onConnect = () => {
  	console.log('Connected');
  	this.mqttStatus = 'Connected';
  	// subscribe
	  this.mqttClient.subscribe(this.topic);
  }

  public onFailure = (responseObject) => {
  	console.log('Failed to connect');
  	this.mqttStatus = 'Failed to connect';
  }

  public onConnectionLost = (responseObject) => {
   	if (responseObject.errorCode !== 0) {
   		this.mqttStatus = 'Disconnected';
	  } 	
  }

  public onMessageArrived = (message) => {
	  //this.message = message.payloadString;
	  console.log(message.payloadString);
	  this.provider.setMessage(message.payloadString);
	  this.ionViewDidLoad();
	  this.event.publish('message');
  }
}

