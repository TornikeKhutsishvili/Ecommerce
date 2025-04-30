import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  search(query: string, items: any[]) {
    // console.log(`Searching products for: ${query}`);
    return items.filter(item => item.title.toLowerCase().includes(query.toLowerCase())); // ფილტრავს პროდუქტებს სახელის მიხედვით
  }

  private searchQuery = new BehaviorSubject<string>(''); // საწყისი მნიშვნელობა ცარიელია
  searchQuery$ = this.searchQuery.asObservable(); // ამის გამო სხვაგან შეგვეძლება მისი გამოწერა

  updateSearchQuery(query: string) {
    this.searchQuery.next(query);
  }

}
