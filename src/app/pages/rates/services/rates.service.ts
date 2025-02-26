import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

import { Rate } from '../interfaces/rates.model';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  private apiUrl = 'http://localhost:3000/rates';

  constructor(private http: HttpClient) { }

  getRates(): Observable<Rate[]> {
    return this.http.get<Rate[]>(this.apiUrl).pipe(
      tap((data) => console.log('Datos recibidos:', data)), 
      catchError((error) => {
        console.error('Error al cargar las tarifas:', error);
        throw error; 
      })
    );
  }

  getRateById(id: string): Observable<Rate> {
    return this.http.get<Rate>(`${this.apiUrl}/${id}`);
  }

  createRate(rate: Rate): Observable<Rate> {
    return this.http.post<Rate>(this.apiUrl, rate);
  }

  updateRate(id: string, rate: Rate): Observable<Rate> {
    return this.http.put<Rate>(`${this.apiUrl}/${id}`, rate);
  }

  deleteRate(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}