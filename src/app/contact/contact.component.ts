// contact.component.ts

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  
  // URL de tu script PHP corregido
  private readonly apiUrl = 'http://localhost:8082/api/send_contact.php'; // ⬅️ Revisa tu puerto
  
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) { }

  onSubmit(form: NgForm): void {
    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    if (form.valid) {
      const formData = {
        name: form.value.name,
        email: form.value.email,
        message: form.value.message
      };

      this.http.post(this.apiUrl, formData).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          
          // ⬅️ ¡ESTO ES LO QUE NECESITAS!
          // Muestra el objeto JSON completo devuelto por el servidor PHP en la consola.
          console.log('✅ Respuesta Completa del Servidor PHP:', response); 

          // Lógica para mostrar el mensaje al usuario
          this.successMessage = response.message || '¡Gracias! Mensaje enviado con éxito.';
          form.reset(); 
        },
        error: (error) => {
          this.isLoading = false;
          // Muestra el error completo en la consola
          console.error('❌ Error en la comunicación con el servidor:', error);
          
          this.errorMessage = error.error?.message || 'Hubo un error al enviar tu mensaje. Intenta más tarde.';
        }
      });
    } else {
      this.isLoading = false;
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
    }
  }
}