import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ModalControllerService } from '@services/modal-controller.service';

@Component({
  selector: 'app-close-modal',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './close-modal.component.html',
  styleUrl: './close-modal.component.scss'
})
export class CloseModalComponent {
  constructor(private modalService: ModalControllerService) {}

  closeModal (){
    this.modalService.closeModal();
  }
}
