import { Component, OnInit } from '@angular/core';
import { PositionSensor, Sensor } from '../../sensor';
import { TempService } from '../../services/temperature.service';
import { PositionService } from '../../services/position.service';
import { AirService } from '../../services/air.service';
import Chart from 'chart.js';
import { Positions } from './positions';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-position',
    templateUrl: './position.component.html',
    styleUrls: ['./position.component.scss']
})


export class PositionComponent implements OnInit {

    sensor: PositionSensor[] = [];
    positions: Positions[];
    percetD: number;
    percentC: number;
    percentA: number;
    percentLG: number;
    percentLD: number;

    tempChart: Chart;

    constructor(private tempService: TempService, private positionService: PositionService,
        private airService: AirService) { }

    ngOnInit(): void {
        this.getPositions()
        setInterval(() => this.getPositions(), environment.intervalT);
        this.initCharts();
        // this.getCurentTemperatures();
    }

    getPositions() {
        return this.positionService.getPositions()
            .subscribe(
                sensor => {
                    let bb: boolean;
                    console.log('position');
                    // this.sensor = sensor;
                    sensor.forEach(sen => {
                        let b: boolean = false;
                        this.sensor.forEach(senGet => {
                            b = b || (sen.id == senGet.id)
                        })
                        if (!b) {
                            bb = !b;
                            this.sensor.push(sen);
                        }
                    })
                    if (bb) {
                        this.tempChart.data = {
                            labels: this.getLabels(),
                            datasets: [{
                                data: this.getValues('debout'),
                                label: "Debout",
                                borderColor: "rgb(6, 48, 134)",
                                backgroundColor: "rgb(6, 48, 134, 0.5)",
                                steppedLine: true
                            },
                            {
                                data: this.getValues(''),
                                label: "alongé",
                                borderColor: "rgb(6, 134, 42 )",
                                backgroundColor: "rgb(6, 134, 42 , 0.5)",
                                steppedLine: true
                            }]
                        };
                        this.tempChart.update();
                    }
                }
            );
    }

    initCharts() {
        let temp = document.getElementById('positionChart');
        console.log(temp);
        this.tempChart = new Chart(temp, {
            type: 'line',
            data: {
                labels: this.getLabels(),
                datasets: [{
                    data: this.getValues('debout'),
                    label: "Debout",
                    borderColor: "#3e95cd",
                    steppedLine: true
                },
                {
                    data: this.getValues(''),
                    label: "alongé",
                    borderColor: "#8e5ea2",
                    steppedLine: true
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'second'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            suggestedMax: 2,
                            callback: function (value, index, values) {
                                return value;
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
        // this.sensor.forEach(temp => {
        //     labels.push(new Date(temp.date).getDate() + '/'
        //         + new Date(temp.date).getMonth() + 1 + '/'
        //         + new Date(temp.date).getFullYear() + '\nat : '
        //         + new Date(temp.date).getHours() + ':'
        //         + new Date(temp.date).getMinutes() + ':'
        //         + new Date(temp.date).getSeconds());
        // })
        this.sensor.forEach(temp => {
            labels.push(temp.date);
        })
        return labels;
    }

    getValues(courbe: string): number[] {
        let positions = courbe == 'debout' ? [5] : [1, 2, 3, 4];
        let values = [];
        this.percetD = 0;
        this.percentC = 0;
        this.percentA = 0;
        this.percentLG = 0;
        this.percentLD = 0;
        this.sensor.forEach(temp => {
            switch (temp.position) {
                case 1:
                    this.percentA++;
                    break;
                case 2:
                    this.percentLG++;
                    break;
                case 3:
                    this.percentLD++;
                    break;
                case 4:
                    this.percentC++;
                    break;
                case 5:
                    this.percetD++;
                    break;
            }
            // console.log(temp.position)
            if (positions.includes(temp.position))
                values.push(1);
            else values.push(0);
        });
        // console.log(values)
        
    this.percetD = (this.percetD / this.sensor.length)*100;
    this.percentC = (this.percentC / this.sensor.length)*100;
    this.percentA = (this.percentA / this.sensor.length)*100;
    this.percentLG = (this.percentLG / this.sensor.length)*100;
    this.percentLD = (this.percentLD / this.sensor.length)*100;
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
