import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Analytics } from '../models/analytics';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private http: HttpClient) { }

  getAnalytics(): Observable<Analytics> {
    return this.http.get<Analytics>('https://fsfapp.onrender.com/api/analytics/analytics');
  }
}
