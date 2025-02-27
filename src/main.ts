import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Inventory Management System</h1>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
      <footer class="app-footer">
        <p>&copy; 2025 Inventory Management System</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .app-header {
      background-color: #3f51b5;
      color: white;
      padding: 16px;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    
    .app-header h1 {
      margin: 0;
      font-size: 24px;
    }
    
    main {
      flex: 1;
      background-color: #f5f5f5;
    }
    
    .app-footer {
      background-color: #f5f5f5;
      color: #666;
      text-align: center;
      padding: 16px;
      border-top: 1px solid #ddd;
    }
  `]
})
export class App {
  name = 'Inventory Management System';
}

bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(MatDialogModule)
  ]
});