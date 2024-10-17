import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTermSubject = new BehaviorSubject<string>(''); // Termino de búsqueda inicial
  searchTerm$ = this.searchTermSubject.asObservable(); // Observable para el término de búsqueda

  constructor() {}

  // Método para actualizar el término de búsqueda
  setSearchTerm(term: string): void { 
    this.searchTermSubject.next(term);
  }
}
