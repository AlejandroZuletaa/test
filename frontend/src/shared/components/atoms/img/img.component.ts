import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img',
  standalone: true,
  imports: [],
  templateUrl: './img.component.html',
  styleUrl: './img.component.scss'
})
export class ImgComponent {
  @Input() srcImg:string = '';
  @Input() altImg:string = '';
}
