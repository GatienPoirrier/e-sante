import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PositionSensor } from '../sensor';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private positionsUrl = 'http://192.168.215.146:8080/api/position';  // URL to web api
  constructor( 
    private http: HttpClient
  ) { }

  getPositions (): Observable<PositionSensor[]> {
    return this.http.get<PositionSensor[]>(this.positionsUrl)
  }

  getPosition(id: number): Observable<PositionSensor> {
    const url = `${this.positionsUrl}/${id}`;
    return this.http.get<PositionSensor>(url);
  }

  addPosition (position: PositionSensor): Observable<PositionSensor> {
    return this.http.post<PositionSensor>(this.positionsUrl, position, httpOptions);
  }

  deletePosition (position: PositionSensor | number): Observable<PositionSensor> {
    const id = typeof position === 'number' ? position : position.id;
    const url = `${this.positionsUrl}/${id}`;

    return this.http.delete<PositionSensor>(url, httpOptions);
  }

  updatePosition (position: PositionSensor): Observable<any> {
    return this.http.put(this.positionsUrl, position, httpOptions);
  }
}