import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  template: `
    <div class="landing-container">
      <div class="hero-section">
        <div class="hero-content">
          <h1>Inventory Management System</h1>
          <p class="hero-subtitle">Streamline your inventory tracking and management</p>
          <button mat-raised-button color="primary" class="cta-button" (click)="navigateToInventory()">
            <mat-icon>inventory_2</mat-icon>
            Get Started
          </button>
        </div>
      </div>

      <div class="features-section">
        <h2 class="section-title">Key Features</h2>
        <div class="features-grid">
          <mat-card class="feature-card">
            <mat-icon class="feature-icon">dashboard</mat-icon>
            <mat-card-title>Intuitive Dashboard</mat-card-title>
            <mat-card-content>
              <p>Get a comprehensive overview of your inventory with our easy-to-use dashboard.</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="feature-card">
            <mat-icon class="feature-icon">search</mat-icon>
            <mat-card-title>Advanced Search</mat-card-title>
            <mat-card-content>
              <p>Find products quickly with powerful filtering and sorting capabilities.</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="feature-card">
            <mat-icon class="feature-icon">add_circle</mat-icon>
            <mat-card-title>Easy Product Management</mat-card-title>
            <mat-card-content>
              <p>Add, edit, and remove products with just a few clicks.</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="feature-card">
            <mat-icon class="feature-icon">view_module</mat-icon>
            <mat-card-title>Multiple Views</mat-card-title>
            <mat-card-content>
              <p>Switch between table and grid views to visualize your inventory the way you prefer.</p>
            </mat-card-content>
          </mat-card>
        </div>
      </div>

      <div class="how-it-works-section">
        <h2 class="section-title">How It Works</h2>
        <div class="steps-container">
          <div class="step">
            <div class="step-number">1</div>
            <h3>Add Your Products</h3>
            <p>Enter product details including name, description, price, and quantity.</p>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <h3>Manage Inventory</h3>
            <p>Update stock levels, edit product information, and track changes over time.</p>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <h3>Search & Filter</h3>
            <p>Quickly find products using the search functionality and various filters.</p>
          </div>
        </div>
      </div>

      <div class="cta-section">
        <h2>Ready to streamline your inventory management?</h2>
        <button mat-raised-button color="primary" class="cta-button" (click)="navigateToInventory()">
          Get Started Now
        </button>
      </div>
    </div>
  `,
  styles: [`
    .landing-container {
      max-width: 100%;
      overflow-x: hidden;
    }

    .hero-section {
      background: linear-gradient(135deg, #3f51b5 0%, #7986cb 100%);
      color: white;
      padding: 80px 20px;
      text-align: center;
      position: relative;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .hero-section h1 {
      font-size: 3rem;
      margin-bottom: 20px;
      font-weight: 700;
    }

    .hero-subtitle {
      font-size: 1.5rem;
      margin-bottom: 40px;
      opacity: 0.9;
    }

    .cta-button {
      padding: 8px 24px;
      font-size: 1.1rem;
      border-radius: 30px;
    }

    .section-title {
      text-align: center;
      font-size: 2.2rem;
      margin-bottom: 50px;
      color: #333;
      position: relative;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background-color: #3f51b5;
      border-radius: 2px;
    }

    .features-section {
      padding: 80px 20px;
      background-color: #f5f5f5;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .feature-card {
      padding: 30px;
      text-align: center;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .feature-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }

    .feature-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      margin-bottom: 20px;
      color: #3f51b5;
    }

    .how-it-works-section {
      padding: 80px 20px;
      background-color: white;
    }

    .steps-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 40px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .step {
      flex: 1;
      min-width: 250px;
      max-width: 350px;
      text-align: center;
      padding: 20px;
    }

    .step-number {
      background-color: #3f51b5;
      color: white;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0 auto 20px;
    }

    .cta-section {
      background-color: #3f51b5;
      color: white;
      padding: 60px 20px;
      text-align: center;
    }

    .cta-section h2 {
      font-size: 2rem;
      margin-bottom: 30px;
    }

    .cta-section .cta-button {
      background-color: white;
      color: #3f51b5;
      font-weight: bold;
    }

    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 2.2rem;
      }

      .hero-subtitle {
        font-size: 1.2rem;
      }

      .section-title {
        font-size: 1.8rem;
      }

      .steps-container {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  navigateToInventory(): void {
    this.router.navigate(['/inventory']);
  }
}