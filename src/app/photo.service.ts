import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private photoApiUrl = 'http://localhost:8082/api/get_photos.php'; // Asegúrate de que esta URL sea la correcta para tu servidor PHP

  constructor(private http: HttpClient) { }

  getPhotos(): Observable<any[]> {
    return this.http.get<any[]>(this.photoApiUrl);
  }
}