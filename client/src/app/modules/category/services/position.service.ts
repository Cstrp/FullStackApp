import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Position } from '../models/position';
import { Observable } from 'rxjs';
import { Message } from '../../../shared/models/message';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  constructor(private http: HttpClient) {}

  getAllPositions(id: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/${id}`);
  }

  createPosition(position: Position): Observable<Position> {
    return this.http.post<Position>('api/position', position);
  }

  updatePosition(position: Position): Observable<Position> {
    return this.http.patch<Position>(`api/position/${position._id}`, position);
  }

  removePosition(position: Position): Observable<Message> {
    return this.http.delete<Message>(`api/position/${position._id}`);
  }
}
