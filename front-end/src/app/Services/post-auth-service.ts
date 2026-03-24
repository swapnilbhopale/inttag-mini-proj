import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../environments';

@Injectable({
  providedIn: 'root',
})
export class PostAuthService {
  constructor(private http: HttpClient) {}

  getEmpData() {
    return this.http.get(API_URL + '/data');
  }
}
