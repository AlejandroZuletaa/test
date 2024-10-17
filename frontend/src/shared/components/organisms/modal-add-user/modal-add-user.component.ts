import { Component } from '@angular/core';
import { CloseModalComponent } from '@atoms/close-modal/close-modal.component';
import { ImgComponent } from '@atoms/img/img.component';
import { ModalComponent } from '@atoms/modal/modal.component';
import { FormComponent } from '@molecules/form/form.component';


@Component({
  selector: 'app-modal-add-user',
  standalone: true,
  imports: [ModalComponent, FormComponent, ImgComponent, CloseModalComponent],
  templateUrl: './modal-add-user.component.html',
  styleUrl: './modal-add-user.component.scss'
})
export class ModalAddUserComponent {
 title:string = 'Add user'
 srcImg: string = 'imagenes/register.svg';
 altImg:string = 'Image register user'
}
