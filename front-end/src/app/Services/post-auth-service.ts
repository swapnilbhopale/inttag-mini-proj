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

  postEmpData(data: any) {
    return this.http.post(API_URL + '/create', data);
  }

  updateEmpData(data: any) {
    return this.http.put(API_URL + '/update-emp', data);
  }

  deleteEmpData(email: string) {
    return this.http.delete(`${API_URL}/del-emp/${email}`);
  }

  postNewMovie(data: any) {
    return this.http.post(API_URL + '/movies', data);
  }
}
