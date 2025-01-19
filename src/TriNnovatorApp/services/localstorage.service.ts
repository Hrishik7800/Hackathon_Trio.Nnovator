import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalstorageService {
  static getItem(USERNAME: string) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
  getItem<T>(key: string): T | null {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Set item in local storage
  setItem<T>(key: string, value: T): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  // Remove item from local storage
  removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }
}
