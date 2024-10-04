import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Db } from '../types/dbTypes';
import { Id } from '../types/model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  getAll<T extends Db[keyof Db]>(path: keyof Db): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}/${path}`);
  }
  getOne<T extends Db[keyof Db]>(path: keyof Db, id: Id): Observable<T> {
    return this.http.get<T>(`${this.url}/${path}/${id}`);
  }
  add<T extends Db[keyof Db]>(path: keyof Db, data: T) {
    return this.http.post(`${this.url}/${path}`, data);
  }
  update<T extends Db[keyof Db]>(path: keyof Db, data: T) {
    return this.http.put(`${this.url}/${path}/${data.id}`, data);
  }
  delete(path: keyof Db, id: Id) {
    return this.http.delete(`${this.url}/${path}/${id}`);
  }
}
