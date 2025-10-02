import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service'; // Importa el servicio

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  photos: any[] = []; // Un array para guardar las fotos destacadas

  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.photoService.getPhotos().subscribe(data => {
      // Tomamos las primeras 3 fotos para el carrusel destacado
      this.photos = data.slice(0, 3);
    });
  }
}