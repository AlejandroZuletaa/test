import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalControllerService {
  // Nuevo estado que mantiene si el modal está abierto y qué tipo de modal es
  private modalState = new BehaviorSubject<{ isOpen: boolean; type: 'edit' | 'register' | null }>({
    isOpen: false,
    type: null,
  });

  // Observable para seguir el estado del modal
  modalState$ = this.modalState.asObservable();

  // Método para abrir el modal especificando si es de tipo 'edit' o 'register'
  openModal(type: 'edit' | 'register'):void {
    this.modalState.next({ isOpen: true, type });    
    console.log('Modal opened:', { isOpen: true, type }); // Agregar esta línea
  }

  // Método para cerrar el modal
  closeModal() {
    this.modalState.next({ isOpen: false, type: null });
  }
}
