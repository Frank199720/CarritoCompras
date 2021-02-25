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
  public cantidadUsuarios;
  public data2;
  public datax=[0,0,0,0,0,0,0,0,0,0,0,0];
  public ProductoTop:ProductoTop[];
  public ClienteTop:ClienteTop[];

  constructor(private DashboardService:DashboardService){
    this.DashboardService.obtenerVentasxMesActual().subscribe((data)=>{
        this.cantidadVentas=(data[0].nrocompras);
        
    })
    this.DashboardService.obtenerClientes().subscribe((data)=>{
      this.cantidadUsuarios=(data[0].cantidadusuarios);
      
  })
    this.DashboardService.obtenerProductosTop().subscribe((data:ProductoTop[])=>{
      this.ProductoTop=data;
    })
    this.DashboardService.obtenerClientesTop().subscribe((data:ClienteTop[])=>{
      this.ClienteTop=data;
    })
    
  }
  ngOnInit() {
    this.DashboardService.obtenerVentasxPeriodo().subscribe((response)=>{
      let arreglo=response;
      console.log(arreglo);
      for(let i =0 ; i<12 ; i++){
        
        if(!response[i])
        break;
        let mes:string=response[i].com_periodo;
        
        let mesx=mes.substr(4,2);
        switch(mesx){
          case  '01': this.datax[0]=response[i].nrocompras; break;
          case  '02': this.datax[1]=response[i].nrocompras; break;
          case  '03': this.datax[2]=response[i].nrocompras; break;
          case  '04': this.datax[3]=response[i].nrocompras; break;
          case  '05': this.datax[4]=response[i].nrocompras; break;
          case  '06': this.datax[5]=response[i].nrocompras; break;
          case  '07': this.datax[6]=response[i].nrocompras; break;
          case  '08': this.datax[7]=response[i].nrocompras; break;
          case  '09': this.datax[8]=response[i].nrocompras; break;
          case  '10': this.datax[9]=response[i].nrocompras; break;
          case  '11': this.datax[10]=response[i].nrocompras; break;
          case  '12': this.datax[11]=response[i].nrocompras; break;
        }
        console.log(mesx);
      }
      
      console.log(this.datax);
      this.data2={
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago','Sep','Oct','Nov','Dic'],
        datasets: [
          {
            label: "Sales",
            data: this.datax,
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
    
    
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders =<HTMLCanvasElement>  document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


   

    var chartSales =<HTMLCanvasElement>  document.getElementById('chart-sales');

    
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}
export interface ProductoTop {
  cantidadcomprada?:number;
  pro_nombre:string;
 
}
export interface ClienteTop {
  comprasrealizadas?:number;
  nombreusuario:string;
 
}
