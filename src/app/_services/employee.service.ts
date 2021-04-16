import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../_models/employee.model';

const baseUrl = 'http://localhost:8000/api/categories';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(baseUrl);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(data: any): Observable<any> {
    return this.http.put(`${baseUrl}`, data);
  }
}
