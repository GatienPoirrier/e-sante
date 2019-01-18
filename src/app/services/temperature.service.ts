import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sensor } from '../sensor';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TempService {
  private temperaturesUrl = 'http://192.168.215.146:8080/api/temperatures';  // URL to web api
  constructor( 
    private http: HttpClient
  ) { }

  getTemperatures (): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(this.temperaturesUrl)
  }

  getTemperature(id: number): Observable<Sensor> {
    const url = `${this.temperaturesUrl}/${id}`;
    return this.http.get<Sensor>(url);
  }

  addTemperature (temperature: Sensor): Observable<Sensor> {
    return this.http.post<Sensor>(this.temperaturesUrl, temperature, httpOptions);
  }

  deleteTemperature (temperature: Sensor | number): Observable<Sensor> {
    const id = typeof temperature === 'number' ? temperature : temperature.id;
    const url = `${this.temperaturesUrl}/${id}`;

    return this.http.delete<Sensor>(url, httpOptions);
  }

  updateTemperature (temperature: Sensor): Observable<any> {
    return this.http.put(this.temperaturesUrl, temperature, httpOptions);
  }
}