import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { Message } from '../../../shared/models/message';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:4201/category');
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`http://localhost:4201/category/${id}`);
  }

  createCategory(title: string, img?: File): Observable<Category> {
    const formData: FormData = new FormData();

    if (img) formData.append('image', img, img.name);
    formData.append('title', title);

    return this.http.post<Category>('http://localhost:4201/category', formData);
  }

  updateCategory(id: string, title: string, img: File): Observable<Category> {
    const formData: FormData = new FormData();

    if (img) formData.append('image', img);
    formData.append('title', title);

    return this.http.patch<Category>(`http://localhost:4201/category/${id}`, formData);
  }

  removeCategory(id: string): Observable<Message> {
    return this.http.delete<Message>(`http://localhost:4201/category/${id}`);
  }
}
