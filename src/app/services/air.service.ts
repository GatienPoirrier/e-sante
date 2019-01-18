import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AirSensor } from '../sensor';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AirService {
  private airsUrl = 'http://192.168.215.146:8080/api/airs';  // URL to web api
  constructor( 
    private http: HttpClient
  ) { }

  getAirs (): Observable<AirSensor[]> {
    return this.http.get<AirSensor[]>(this.airsUrl)
  }

  getAir(id: number): Observable<AirSensor> {
    const url = `${this.airsUrl}/${id}`;
    return this.http.get<AirSensor>(url);
  }

  addAir (air: AirSensor): Observable<AirSensor> {
    return this.http.post<AirSensor>(this.airsUrl, air, httpOptions);
  }

  deleteAir (air: AirSensor | number): Observable<AirSensor> {
    const id = typeof air === 'number' ? air : air.id;
    const url = `${this.airsUrl}/${id}`;

    return this.http.delete<AirSensor>(url, httpOptions);
  }

  updateAir (air: AirSensor): Observable<any> {
    return this.http.put(this.airsUrl, air, httpOptions);
  }
}