import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../environments';

@Injectable({
  providedIn: 'root',
})
export class PreAuthService {
  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(API_URL + 'login', data);
  }
}
