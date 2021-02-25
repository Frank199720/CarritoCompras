import { Component, OnInit } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import Chart from 'chart.js';
import { DashboardService } from '../../../services/dashboard.service';
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../../variables/charts";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public cantidadVentas;
  public data2;
  constructor(private DashboardService:DashboardService){
    this.DashboardService.obtenerVentasxMesActual().subscribe((data)=>{
        console.log(data[0]);
        
    })
    
  }
  ngOnInit() {
    this.DashboardService.obtenerVentasxMesActual().subscribe((data)=>{
      this.cantidadVentas=data[0].nrocompras;
      this.data2={
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago','Sep','Oct','Nov','Dic'],
        datasets: [
          {
            label: "Sales",
            data: [0,this.cantidadVentas, 0, 0, 0, 0,0,0,0,0,0,0]
          }
        ]
      }
      console.log(this.data2);
       var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: this.data2,
    });
    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: this.data2
		});
  
    })
    
    console.log(this.data2);
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders =<HTMLCanvasElement>  document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


   

    var chartSales =<HTMLCanvasElement>  document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}
