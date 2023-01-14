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
    return this.http.get<Positions[]>(`http://localhost:4201/position/${id}`);
  }

  createPosition(position: Positions): Observable<Positions> {
    return this.http.post<Positions>('http://localhost:4201/position', position);
  }

  updatePosition(position: Positions): Observable<Positions> {
    return this.http.patch<Positions>(`http://localhost:4201/position/${position._id}`, position);
  }

  removePosition(position: Positions): Observable<Message> {
    return this.http.delete<Message>(`http://localhost:4201/position/${position._id}`);
  }
}
