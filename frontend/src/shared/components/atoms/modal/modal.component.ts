import { UpdateUserService } from '@services/update-user.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CloseModalComponent } from '@atoms/close-modal/close-modal.component';
import { UserInterface } from '@interface/userModel';
import { FormComponent } from '@molecules/form/form.component';
import { ModalControllerService } from '@services/modal-controller.service';
import { ImgComponent } from '@atoms/img/img.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, CloseModalComponent, FormComponent, ImgComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() title: string = '';
  @Input() imageUrl!: string;  // Ruta de la imagen
  @Input() imgAlt!: string;  // Texto alternativo
  selectedUser?: UserInterface;

  constructor(public modalService: ModalControllerService, private updateUserService: UpdateUserService) {}

  ngOnInit() {
    // Suscribirse a los cambios en el estado del modal
    this.modalService.modalState$.subscribe((state) => {
      if (state.type === 'edit' && state.isOpen) {
         this.selectedUser = this.updateUserService.getInfo(); // Obtener los datos del usuario para edición
        console.log(this.selectedUser, 'OnInit'); // Verificar que los datos están correctos
      } else {
        this.selectedUser = undefined; // Resetear si se cierra el modal
      }
    });
  }
}
