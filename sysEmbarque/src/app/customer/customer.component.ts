import { Component, OnInit } from '@angular/core';
import { Sensor } from '../sensor';
import { TempService } from '../services/temperature.service';
import { PositionService } from '../services/position.service';
import { AirService } from '../services/air.service';
import Chart from 'chart.js';


@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements OnInit {

    temperatures: Sensor[] = [];
    positions: Sensor[];
    airs: Sensor[];

    curentTemp: Sensor;

    tempChart: Chart;

    constructor(private tempService: TempService, private positionService: PositionService,
        private airService: AirService) { }

    ngOnInit(): void {
    }
}
