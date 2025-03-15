import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(userData: Partial<User>): Observable<User> {
    console.log(userData);
    return this.http.post<User>('http://localhost:9090/user/', userData);
  }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:9090/user');
  }
}
