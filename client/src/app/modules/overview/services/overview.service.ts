import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Overview } from '../models/overview';

@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  constructor(private http: HttpClient) { }

  getOverview(): Observable<Overview> {
    return this.http.get<Overview>('https://fsfapp.onrender.com/api/analytics/overview');
  }
}
