import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  private themeKey = 'theme';

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (this.isBrowser()) {
      const savedTheme = this.getSavedTheme();
      this.applyTheme(savedTheme);
    }
  }

  

  /** 🔹 თემის გადართვა */
  toggleTheme(): void {
    if (!this.isBrowser()) return;

    const currentTheme = this.getSavedTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.saveTheme(newTheme);
  }

  /** 🔹 თემის შენახვა localStorage-ში */
  private saveTheme(theme: string): void {
    if (!this.isBrowser()) return;

    localStorage.setItem(this.themeKey, theme);
    this.applyTheme(theme);
  }

  /** 🔹 თემის გამოყენება */
  private applyTheme(theme: string): void {
    if (!this.isBrowser()) return;

    // Bootstrap-ის data-bs-theme
    document.body.setAttribute('data-bs-theme', theme);

    // წავშალოთ ძველი თემა და დავამატოთ ახალი კლასი
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme === 'dark' ? 'dark-theme' : 'light-theme');
  }

  /** 🔹 localStorage-დან თემის მიღება */
  getSavedTheme(): string {
    return this.isLocalStorageAvailable() ? localStorage.getItem(this.themeKey) || 'light' : 'light';
  }

  /** 🔹 ვამოწმებთ, ბრაუზერში ვმუშაობთ თუ არა */
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /** 🔹 localStorage-ის შემოწმება */
  private isLocalStorageAvailable(): boolean {
    if (!this.isBrowser()) return false;

    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
