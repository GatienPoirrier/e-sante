import { Component, OnInit } from '@angular/core';
import { Sensor, AirSensor } from '../../sensor';
import { TempService } from '../../services/temperature.service';
import { PositionService } from '../../services/position.service';
import { AirService } from '../../services/air.service';
import Chart from 'chart.js';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-air',
    templateUrl: './air.component.html',
    styleUrls: ['./air.component.scss']
})

export class AirComponent implements OnInit {

    temperatures: AirSensor[] = [];
    positions: Sensor[];
    airs: Sensor[];

    curentAir: Sensor;

    airChart: Chart;

    constructor(private tempService: TempService, private positionService: PositionService,
        private airService: AirService) { }

    ngOnInit(): void {
        this.getAirs()
        setInterval(() => this.getAirs(), environment.intervalT)
        this.initCharts();
        // this.getCurentTemperatures();
    }

    getAirs() {
        return this.airService.getAirs()
            .subscribe(
                temperatures => {
                    // this.temperatures = temperatures;
                    let bb: boolean;
                    console.log('air')
                    // this.temperatures = temperatures;
                    temperatures.forEach(temp => {
                        let b: boolean = false;
                        this.temperatures.forEach(tempGet => {
                            b = b || (tempGet.id == temp.id)
                        })
                        if (!b) {
                            console.log("new temp")
                            bb = !b;
                            this.temperatures.push(temp)
                        }

                    })
                    if (bb) {
                        this.airChart.data = {
                            labels: this.getLabels(),
                            datasets: [{
                                data: this.getValues(),
                                label: "aitFlow",
                                borderColor: "#3e95cd"
                            }]
                        };
                        this.airChart.update();
                    }
                }
            );
    }

    initCharts() {
        let temp = document.getElementById('airChart');
        console.log(temp);
        this.airChart = new Chart(temp, {
            type: 'line',
            data: {
                labels: this.getLabels(),
                datasets: [{
                    data: this.getValues(),
                }]
            },
            options: {
                bezierCurve: false,
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'second'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true,   // minimum value will be 0.
                            callback: function (value, index, values) {
                                return value ;
                            }
                        }
                    }]
                },
                title: {
                    text: 'World population per region (in millions)'
                },
                annotation: {
                    annotations: [{
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y-axis-0',
                        value: 38,
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 4,
                        label: {
                            enabled: false,
                            content: 'Test label'
                        }
                    }]
                }
            }
        });
    }

    getLabels(): any[] {
        let labels = [];
        this.temperatures.forEach(temp => {
            labels.push(temp.date)
        })
        return labels;
    }

    getValues(): number[] {
        let values = [];
        this.temperatures.forEach(temp => {
            values.push(temp.air);
        });
        console.log(values)
        return values;
    }

    // getCurentTemperatures() {
    //     let temperatures = this.tempService.getTemperatures()
    //         .subscribe(
    //             temperatures => {
    //                 console.log(temperatures);
    //                 temperatures.forEach(temp => {
    //                     // if (temp.date > new Date(Date.now() - 2000 * 3600)) {
    //                         let temps = this.curentTemp? this.curentTemp.date: new Date(Date.now() - 2000);
    //                         this.curentTemp = temp.date > temps ? 
    //                         temp : this.curentTemp;
    //                     console.log(temp.date)
    //                     // }
    //               })
    //             }
    //         );
    // }

    convert(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
                d.constructor === Array ? new Date(d[0], d[1], d[2]) :
                    d.constructor === Number ? new Date(d) :
                        d.constructor === String ? new Date(d) :
                            typeof d === "object" ? new Date(d.year, d.month, d.date) :
                                NaN
        );
    }
    inRange(d, start, end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(d = this.convert(d).valueOf()) &&
                isFinite(start = this.convert(start).valueOf()) &&
                isFinite(end = this.convert(end).valueOf()) ?
                start <= d && d <= end :
                NaN
        );
    }
}
