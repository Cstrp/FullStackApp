import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Positions } from '../../../shared/models/positions';
import { Observable } from 'rxjs';
import { Message } from '../../../shared/models/message';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  constructor(private http: HttpClient) {}

  getAllPositions(id: string): Observable<Positions[]> {
    return this.http.get<Positions[]>(`api/position/${id}`);
  }

  createPosition(position: Positions): Observable<Positions> {
    return this.http.post<Positions>('api/position', position);
  }

  updatePosition(position: Positions): Observable<Positions> {
    return this.http.patch<Positions>(`api/position/${position._id}`, position);
  }

  removePosition(position: Positions): Observable<Message> {
    return this.http.delete<Message>(`api/position/${position._id}`);
  }
}
