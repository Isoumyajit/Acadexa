import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageWrapper implements Storage {
  [name: string]: any;
  length: number;

  getLength(): number {
    return sessionStorage.length;
  }
  clear(): void {
    sessionStorage.clear();
  }
  getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }
  key(index: number): string | null {
    return sessionStorage.key(index);
  }
  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
  setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }
}

export const STATE_PREFIX = '_aca_';
