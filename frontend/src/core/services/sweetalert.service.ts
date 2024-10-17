import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetalertService {
  constructor() {}

  // Método para mostrar mensaje de éxito
  success(message: string): void {
    Swal.fire({
      html: `
        <div style="display: flex; align-items: center; background-color: #1A3C5D; padding: 5px 10px; border-radius: 5px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A3D5E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span style='font-family: "Montserrat", sans-serif; color: white; font-size: 14px;'>${message}</span>
        </div>
      `,
      showConfirmButton: false, // Sin botón de confirmación
      timer: 3000, // Duración en milisegundos
      timerProgressBar: true, // Barra de progreso visible
      position: 'top-end', // Posición en la parte superior derecha
      width: '400px', // Ancho del alerta
      padding: '0', // Sin padding adicional
      background: '#1A3C5D', // Color de fondo
      didOpen: (toast) => {
        const progressBar = toast.querySelector(
          '.swal2-timer-progress-bar'
        ) as HTMLElement | null;
        if (progressBar) {
          progressBar.style.backgroundColor = '#A3D5E0'; // Color de la barra de progreso
          progressBar.style.height = '2px'; // Altura de la barra de progreso
        }
      },
    });
  }

  // Método para mostrar mensaje de error

  error(title: string, text?: string): void {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      confirmButtonText: 'Aceptar',
      timerProgressBar: true,
      background: '#1A3C5D', // Color de fondo
      iconColor: '#FF3D3D', // Color del icono de error
      titleText: title, // El texto del título
      html: `<div style='font-family: "Montserrat", sans-serif; color: white; font-size: 14px; text-align: center;'>${text}</div>`, // Mensaje centralizado
      width: '400px', // Ancho del alerta
      didOpen: (toast) => {
        const progressBar = toast.querySelector(
          '.swal2-timer-progress-bar'
        ) as HTMLElement | null;
        if (progressBar) {
          progressBar.style.backgroundColor = '#FF3D3D'; // Color de la barra de progreso para errores
          progressBar.style.height = '2px'; // Altura de la barra de progreso
        }
      },
    });
  }
}
