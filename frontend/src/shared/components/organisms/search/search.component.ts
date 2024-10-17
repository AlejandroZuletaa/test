import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { SearchService } from '@services/search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importa CommonModule y FormsModule
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchTerm: string = ''; // Término de búsqueda

  constructor(private searchService: SearchService) {}

  onSearch(): void {
    this.searchService.setSearchTerm(this.searchTerm); // Actualiza el término de búsqueda en el servicio
  }

  emptySeeker():void {
    if (this.searchTerm.trim() == '') {
      this.searchService.setSearchTerm(this.searchTerm); // Actualiza el término de búsqueda en el servicio
    }
  }
}
