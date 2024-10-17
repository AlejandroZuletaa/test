import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CloseModalComponent } from '@atoms/close-modal/close-modal.component';
import { ModalControllerService } from '@services/modal-controller.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, CloseModalComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() title: string = '';
  constructor(public modalService: ModalControllerService) {} //  public para acceder en el HTML
}
