import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../../../shared/models/message';
import { Positions } from '../../../shared/models/positions';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  constructor(private http: HttpClient) { }

  getAllPositions(id: string): Observable<Positions[]> {
    return this.http.get<Positions[]>(`https://fsfapp.onrender.com/api/position/${id}`);
  }

  createPosition(position: Positions): Observable<Positions> {
    return this.http.post<Positions>('https://fsfapp.onrender.com/api/position', position);
  }

  updatePosition(position: Positions): Observable<Positions> {
    return this.http.patch<Positions>(`https://fsfapp.onrender.com/api/position/${position._id}`, position);
  }

  removePosition(position: Positions): Observable<Message> {
    return this.http.delete<Message>(`https://fsfapp.onrender.com/api/position/${position._id}`);
  }
}
