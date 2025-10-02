📸 Photography Web Site
Este proyecto es una plataforma web full-stack que simula una galería de venta de fotografías deportivas (Motocross). Fue generado inicialmente con Angular CLI versión 16.2.14 para el frontend, e incluye un backend robusto basado en PHP para el procesamiento de pagos y lógica de descarga.

✨ Características de la Plataforma
Este proyecto combina una galería de fotos con funcionalidad de comercio electrónico y herramientas avanzadas:

Búsqueda Facial (IA): Los usuarios pueden subir una foto de referencia para filtrar automáticamente todas las imágenes en las que aparecen.

Checkout Seguro con Stripe: Implementación completa del flujo de compra mediante Stripe Checkout Sessions para procesar pagos con tarjeta de forma segura.

Verificación de Pago: El backend verifica la sesión de Stripe en tiempo real antes de autorizar cualquier descarga.

Descarga Digital: Entrega de la fotografía de alta resolución inmediata, protegida por un sistema de tokens temporales.

💻 Tecnologías Utilizadas
Componente

Tecnología

Rol

Frontend

Angular CLI (v16.2.x) & TypeScript

Interfaz de Usuario, Rutas y Comunicación HTTP.

Backend

PHP (v8.x)

Lógica de negocio, gestión de transacciones y endpoints API.

Pagos

Stripe PHP SDK

Creación de sesiones y verificación de pagos.

Herramientas

Composer & Node.js/npm

Gestión de dependencias de PHP y JavaScript.

🚀 Configuración y Ejecución
Sigue estos pasos para levantar el proyecto en tu entorno local.

1. Requisitos Previos
Asegúrate de tener instalados:

Node.js & npm

Angular CLI: npm install -g @angular/cli

PHP (con extensión cURL activada)

Composer

Una clave Stripe Secret Key de prueba (sk_test_...)

2. Configuración del Backend (PHP)
Clona el repositorio:

git clone [TU_URL_DEL_REPOSITORIO]
cd photocross-repo/backend-api

Instala las dependencias de Composer:

composer install

Configura Stripe y Endpoints:

Abre tus archivos PHP (create_checkout.php, verify_payment.php).

Reemplaza sk_test_YOUR_ACTUAL_SECRET_KEY con tu clave secreta real de Stripe.

El backend debe ejecutarse en el puerto 8082.

3. Configuración del Frontend (Angular)
Navega al directorio:

cd photocross-repo/frontend-angular

Instala las dependencias de Node.js:

npm install

4. Ejecución del Proyecto
Iniciar el Servidor PHP (Backend)
Ejecuta el servidor de desarrollo de PHP en el directorio de tu API:

php -S localhost:8082

Iniciar el Servidor Angular (Frontend)
Ejecuta el servidor de desarrollo de Angular. La aplicación estará disponible en http://localhost:4200/.

ng serve

🛠 Comandos de Desarrollo (Angular CLI)
Development server
Run ng serve for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

Code scaffolding
Run ng generate component component-name to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module.

Build
Run ng build to build the project. The build artifacts will be stored in the dist/ directory.

Running unit tests
Run ng test to execute the unit tests via Karma.

Further help
To get more help on the Angular CLI use ng help or go check out the Angular CLI Overview and Command Reference page.

🤝 Contribuciones
Si deseas contribuir o reportar problemas, por favor abre un issue o envíame un pull request. ¡Toda ayuda es bienvenida!

Autor: [Tu Nombre o Alias]
Licencia: [Elegir una licencia, e.g., MIT]
