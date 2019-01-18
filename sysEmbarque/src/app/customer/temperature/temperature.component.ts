import { Component, OnInit, OnDestroy } from '@angular/core';
import { TempService } from '../../services/temperature.service';
import { PositionService } from '../../services/position.service';
import { AirService } from '../../services/air.service';
import Chart from 'chart.js';
import { TimerService } from 'src/app/services/timer.service';
import { Observable } from 'rxjs';
import { Sensor } from 'src/app/sensor';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-temperature',
    templateUrl: './temperature.component.html',
    styleUrls: ['./temperature.component.scss']
})

export class TemperatureComponent implements OnInit, OnDestroy {

    temperatures: Sensor[] = [];
    positions: [];
    airs: [];


    tempChart: Chart;
    flag: boolean;
    navCtrl: any;

    constructor(private tempService: TempService, private positionService: PositionService,
        private airService: AirService, private timer: TimerService) { }

    ngOnInit(): void {
        this.flag = true;
        this.initCharts();
        this.getTemperatures()
        setInterval(() => this.getTemperatures(), environment.intervalT)
        // this.getCurentTemperatures();
    }

    getTemperatures() {
        console.log("temp")
        return this.tempService.getTemperatures()
            .subscribe(
                temperatures => {
                    // if (this.temperatures == temperatures) {
                    let bb: boolean;
                    // this.temperatures = temperatures;
                    temperatures.forEach(temp => {
                        let b: boolean = false;
                        this.temperatures.forEach(tempGet => {
                            b = b || (tempGet.id == temp.id)
                        })
                        if (!b) {
                            bb = !b;
                            this.temperatures.push(temp)
                        }

                    })
                    if (bb) {
                        this.tempChart.data = {
                            labels: this.getLabels(),
                            datasets: [{
                                data: this.getValues(),
                                label: "température",
                                borderColor: "#3e95cd",
                                fill: false
                            }]
                        };
                        this.tempChart.update();
                    }

                    // }

                }
            );
    }

    initCharts() {
        let temp = document.getElementById('temperatureChart');
        console.log(temp);
        this.tempChart = new Chart(temp, {
            type: 'line',
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'second'
                            // displayFormats: {
                            //     second: 'D MMM YYYY h:mm:ss a'
                            // }
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            // suggestedMax: 42,
                            callback: function (value, index, values) {
                                return value + ' °C';
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
            labels.push(new Date(temp.date))
        })
        return labels;
    }

    getValues(): number[] {
        let values = [];
        this.temperatures.forEach(temp => {
            console.log(temp.value)
            values.push(temp.value);
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

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
}
