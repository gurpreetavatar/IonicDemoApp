import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }
  get(url): Observable<any> {
    return this.http.get(url);
  }
  post(url, inputParam): Observable<any> {
    return this.http.post(url, inputParam);
  }

}
