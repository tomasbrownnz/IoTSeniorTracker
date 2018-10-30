import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Provider } from '../../providers/provider/provider';
declare var Paho : any;


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  @ViewChild('kitchenDoughnutCanvas') kitchenDoughnutCanvas: ElementRef;
  @ViewChild('diningDoughnutCanvas') diningDoughnutCanvas: ElementRef;
  @ViewChild('loungeDoughnutCanvas') loungeDoughnutCanvas: ElementRef;
  @ViewChild('bedroomDoughnutCanvas') bedroomDoughnutCanvas: ElementRef;
  @ViewChild('toiletDoughnutCanvas') toiletDoughnutCanvas: ElementRef;
  
  doughnutChart: any; 
  
  constructor(public navCtrl: NavController,  public provider: Provider, public event: Events) {
    this.provider = provider;
    console.log("toilet charge : " +this.provider.batToilet);
    this.event.subscribe('alert', () => {this.alerting()});
    this.event.subscribe('message', () => {this.update()});
  }

  alerting(){
    this.navCtrl.parent.select(0);
  }
  update(){
    this.ionViewDidLoad();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewDidLoad();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 350);
  }

ionViewDidLoad() {

    this.doughnutChart = new Chart(this.kitchenDoughnutCanvas.nativeElement, {
 
      type: 'doughnut',
      data: {
        labels: ["Charged", "Empty"],
        datasets: [{
            label: '# of Votes',
            data: [this.provider.batKitchen, 100 - this.provider.batKitchen],
            backgroundColor: [
              'rgba(0, 100, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)'
          ],
          hoverBackgroundColor: [
              "rgba(0, 100, 0, 1)",
              "rgba(255, 0, 0, 1)"
            ]
        }]
    }

  });

  this.doughnutChart = new Chart(this.diningDoughnutCanvas.nativeElement, {
 
    type: 'doughnut',
    data: {
      labels: ["Charged", "Empty"],
      datasets: [{
          label: '# of Votes',
          data: [this.provider.batDining, 100 - this.provider.batDining],
          backgroundColor: [
            'rgba(0, 100, 0, 0.5)',
            'rgba(255, 0, 0, 0.5)'
        ],
        hoverBackgroundColor: [
            "rgba(0, 100, 0, 1)",
            "rgba(255, 0, 0, 1)"
          ]
      }]
  }

});

this.doughnutChart = new Chart(this.loungeDoughnutCanvas.nativeElement, {
 
  type: 'doughnut',
  data: {
    labels: ["Charged", "Empty"],
    datasets: [{
        label: '# of Votes',
        data: [this.provider.batLiving, 100 - this.provider.batLiving],
        backgroundColor: [
          'rgba(0, 100, 0, 0.5)',
          'rgba(255, 0, 0, 0.5)'
      ],
      hoverBackgroundColor: [
          "rgba(0, 100, 0, 1)",
          "rgba(255, 0, 0, 1)"
        ]
    }]
}

});

this.doughnutChart = new Chart(this.bedroomDoughnutCanvas.nativeElement, {
 
  type: 'doughnut',
  data: {
    labels: ["Charged", "Empty"],
    datasets: [{
        label: '# of Votes',
        data: [this.provider.batBedroom, 100 - this.provider.batBedroom],
        backgroundColor: [
          'rgba(0, 100, 0, 0.5)',
          'rgba(255, 0, 0, 0.5)'
      ],
      hoverBackgroundColor: [
          "rgba(0, 100, 0, 1)",
          "rgba(255, 0, 0, 1)"
        ]
    }]
}

});

this.doughnutChart = new Chart(this.toiletDoughnutCanvas.nativeElement, {
 
  type: 'doughnut',
  data: {
      labels: ["Charged", "Empty"],
      datasets: [{
          label: '# of Votes',
          data: [this.provider.batToilet, 100 - this.provider.batToilet],
          backgroundColor: [
              'rgba(0, 100, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)'
          ],
          hoverBackgroundColor: [
              "rgba(0, 100, 0, 1)",
              "rgba(255, 0, 0, 1)"
            ]
      }]
  }

});
}

}