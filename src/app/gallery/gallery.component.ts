import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service'; 
import { HttpClient } from '@angular/common/http';

interface Photo {
  id: number;
  url: string;
  caption: string;
  price: number; 
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  
  photos: Photo[] = []; // Fotos que se muestran actualmente (filtradas o completas)
  originalPhotos: Photo[] = []; // Lista original completa de fotos
  
  // Propiedades para la búsqueda facial
  searchFile: File | null = null;
  isSearching = false; // Estado de carga para el botón de búsqueda

  constructor(
    private photoService: PhotoService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.photoService.getPhotos().subscribe((data: any[]) => {
      // 1. Asignamos el precio fijo de $50.00 MXN al cargar los datos
      const pricedPhotos: Photo[] = data.map((photo: any) => ({
        id: photo.id,
        url: photo.url,
        caption: photo.caption,
        price: 50.00 
      }));
      
      this.originalPhotos = pricedPhotos; // Guardamos la lista completa
      this.photos = pricedPhotos; // Inicialmente mostramos todas las fotos
    });
  }

  // Maneja la selección del archivo de búsqueda del usuario
  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.searchFile = event.target.files[0];
    }   
  }

  // Ejecuta la llamada al backend para el reconocimiento facial
  searchPhotosByFace(): void {
    if (!this.searchFile) {
      // En un entorno real, usarías un modal o notificación, no alert()
      console.error('Por favor, sube una foto de referencia.'); 
      return;
    }
    
    this.isSearching = true;
    
    const formData = new FormData();
    formData.append('searchImage', this.searchFile, this.searchFile.name);

    // Llama al nuevo endpoint del servidor PHP para la búsqueda facial
    this.http.post('http://localhost:8082/api/search_by_face.php', formData)
      .subscribe({
        next: (response: any) => {
          this.isSearching = false;
          const matchingIds: number[] = response.photoIds || []; 
          
          // Filtra las fotos originales con los IDs coincidentes
          this.photos = this.originalPhotos.filter(photo => 
            matchingIds.includes(photo.id)
          );

          if (this.photos.length === 0) {
            console.log('No se encontraron fotos con ese rostro.');
            // Implementar una notificación de "No encontrado" en el HTML
          }
        },
        error: (err) => {
          this.isSearching = false;
          console.error('Error en la búsqueda facial:', err);
          // Implementar una notificación de error en el HTML
        }
      });
  }
  
  // Restaura la galería a su estado completo
  resetGallery(): void {
    this.photos = this.originalPhotos;
    this.searchFile = null;
    // Lógica para resetear el input[type=file] si fuera necesario, usando @ViewChild
  }

  // Método de compra que envía el ID y el PRECIO al backend
  buyPhoto(photo: Photo) { 
    console.log('Iniciando compra para la foto:', photo.caption, 'con precio:', photo.price);
    
    this.http.post('http://localhost:8082/api/create_checkout.php', { 
        photoId: photo.id,
        price: photo.price, 
        caption: photo.caption 
      })
      .subscribe((res: any) => {
        window.location.href = res.url;
      });
  }
}
