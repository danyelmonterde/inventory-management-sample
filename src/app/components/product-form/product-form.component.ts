import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.isNew ? 'Add New Product' : 'Edit Product' }}</h2>
    <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
      <div mat-dialog-content>
        <div class="image-preview-container">
          <img [src]="productForm.get('imageUrl')?.value" alt="Product image preview" class="image-preview">
        </div>
        
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" placeholder="Product name" required>
          <mat-error *ngIf="productForm.get('name')?.hasError('required')">
            Name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" placeholder="Product description" rows="3"></textarea>
        </mat-form-field>

        <div class="form-row">
          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Category</mat-label>
            <mat-select formControlName="category" required>
              <mat-option value="Electronics">Electronics</mat-option>
              <mat-option value="Furniture">Furniture</mat-option>
              <mat-option value="Clothing">Clothing</mat-option>
              <mat-option value="Books">Books</mat-option>
              <mat-option value="Office Supplies">Office Supplies</mat-option>
              <mat-option value="Other">Other</mat-option>
            </mat-select>
            <mat-error *ngIf="productForm.get('category')?.hasError('required')">
              Category is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Price ($)</mat-label>
            <input matInput type="number" formControlName="price" placeholder="0.00" min="0" step="0.01" required>
            <mat-error *ngIf="productForm.get('price')?.hasError('required')">
              Price is required
            </mat-error>
            <mat-error *ngIf="productForm.get('price')?.hasError('min')">
              Price must be positive
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Quantity</mat-label>
            <input matInput type="number" formControlName="quantity" placeholder="0" min="0" step="1" required>
            <mat-error *ngIf="productForm.get('quantity')?.hasError('required')">
              Quantity is required
            </mat-error>
            <mat-error *ngIf="productForm.get('quantity')?.hasError('min')">
              Quantity must be positive
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Image URL</mat-label>
            <input matInput formControlName="imageUrl" placeholder="https://example.com/image.jpg" (input)="onImageUrlChange()">
            <mat-hint>Enter a URL for the product image</mat-hint>
          </mat-form-field>
        </div>
        
        <div class="image-suggestions">
          <h3>Suggested Images</h3>
          <div class="image-grid">
            <div *ngFor="let image of sampleImages" class="image-option" (click)="selectImage(image)">
              <img [src]="image" alt="Sample product image" class="sample-image">
            </div>
          </div>
        </div>
      </div>

      <div mat-dialog-actions align="end">
        <button mat-button type="button" (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="productForm.invalid">
          {{ data.isNew ? 'Add Product' : 'Update Product' }}
        </button>
      </div>
    </form>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
    
    .form-row {
      display: flex;
      gap: 15px;
    }
    
    .form-field {
      flex: 1;
      margin-bottom: 15px;
    }
    
    .image-preview-container {
      text-align: center;
      margin-bottom: 20px;
      border: 1px dashed #ccc;
      padding: 10px;
      border-radius: 4px;
    }
    
    .image-preview {
      max-width: 100%;
      max-height: 200px;
      object-fit: contain;
    }
    
    .image-suggestions {
      margin-top: 20px;
    }
    
    .image-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-top: 10px;
    }
    
    .image-option {
      cursor: pointer;
      border: 2px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      transition: border-color 0.2s;
    }
    
    .image-option:hover {
      border-color: #3f51b5;
    }
    
    .sample-image {
      width: 100%;
      height: 80px;
      object-fit: cover;
    }
    
    @media (max-width: 600px) {
      .form-row {
        flex-direction: column;
        gap: 0;
      }
      
      .image-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  sampleImages: string[] = [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format',
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&auto=format',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&auto=format'
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product | null, isNew: boolean }
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      id: [this.data.product?.id],
      name: [this.data.product?.name || '', Validators.required],
      description: [this.data.product?.description || ''],
      category: [this.data.product?.category || '', Validators.required],
      price: [this.data.product?.price || 0, [Validators.required, Validators.min(0)]],
      quantity: [this.data.product?.quantity || 0, [Validators.required, Validators.min(0)]],
      imageUrl: [this.data.product?.imageUrl || 'https://via.placeholder.com/500x300'],
      lastUpdated: [this.data.product?.lastUpdated || new Date()]
    });
  }

  onImageUrlChange(): void {
    // This method is called when the image URL input changes
    // You could add validation or preview logic here if needed
  }

  selectImage(imageUrl: string): void {
    this.productForm.patchValue({
      imageUrl: imageUrl
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}