import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../../../shared/models/message';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>('https://fsfapp.onrender.com/api/category');
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`https://fsfapp.onrender.com/api/category/${id}`);
  }

  createCategory(title: string, img?: File): Observable<Category> {
    const formData: FormData = new FormData();

    if (img) formData.append('image', img, img.name);
    formData.append('title', title);

    return this.http.post<Category>('https://fsfapp.onrender.com/api/category', formData);
  }

  updateCategory(id: string, title: string, img: File): Observable<Category> {
    const formData: FormData = new FormData();

    if (img) formData.append('image', img);
    formData.append('title', title);

    return this.http.patch<Category>(`https://fsfapp.onrender.com/api/category/${id}`, formData);
  }

  removeCategory(id: string): Observable<Message> {
    return this.http.delete<Message>(`https://fsfapp.onrender.com/api/category/${id}`);
  }
}
