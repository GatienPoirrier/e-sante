import { Component, OnInit } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpMethod } from 'blocking-proxy/built/lib/webdriver_commands';
import mysql, {initSession, executeQuery, createConnection, createPool} from 'my-sql';
import { Connection } from '@angular/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sysEmbarque';
  temp = 37.5;
  // connection = mysql.createConnection({
  //   host: 'localhost',
  //   user: 'alaudre',
  //   password: 'Zenon00789',
  //   database: 'raspberry'
  // });
  

  // constructor(private http: HttpClient){
  //     }

  ngOnInit(): void {

    // initSession({
    //   connectionLimit : 10,
    //   host            : 'localhost',
    //   user            : 'alaudre',
    //   password        : 'Zenon00789',
    //   database        : 'alaudre'
    // });

    // executeQuery('SELECT * FROM likes')
    // .then((result)=>{
    //   console.log(result);
    //     // Do something with the result array  
    // })
    // .catch((err)=>{
    //   console.log(err);
    //     // Some error has occurred
    // });
    // // this.connection.connect();
    
    // // console.log(this.connection.query('SELECT * from matiere'))
    // //     var ctx = document.getElementById("myChart").getContext('2d');
    // // var myChart = new Chart(ctx, {
    // //     type: 'bar',
    // //     data: {
    // //         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    // //         datasets: [{
    // //             label: '# of Votes',
    // //             data: [12, 19, 3, 5, 2, 3],
    // //             backgroundColor: [
    // //                 'rgba(255, 99, 132, 0.2)',
    // //                 'rgba(54, 162, 235, 0.2)',
    // //                 'rgba(255, 206, 86, 0.2)',
    // //                 'rgba(75, 192, 192, 0.2)',
    // //                 'rgba(153, 102, 255, 0.2)',
    // //                 'rgba(255, 159, 64, 0.2)'
    // //             ],
    // //             borderColor: [
    // //                 'rgba(255,99,132,1)',
    // //                 'rgba(54, 162, 235, 1)',
    // //                 'rgba(255, 206, 86, 1)',
    // //                 'rgba(75, 192, 192, 1)',
    // //                 'rgba(153, 102, 255, 1)',
    // //                 'rgba(255, 159, 64, 1)'
    // //             ],
    // //             borderWidth: 1
    // //         }]
    // //     },
    // //     options: {
    // //         scales: {
    // //             yAxes: [{
    // //                 ticks: {
    // //                     beginAtZero:true
    // //                 }
    // //             }]
    // //         }
    // //     }
    // // });
  }
}
