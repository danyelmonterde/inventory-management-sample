import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { InventoryService } from '../../services/inventory.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    FormsModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="container">
      <mat-card class="mat-elevation-z4">
        <mat-card-header>
          <mat-card-title>Inventory Management</mat-card-title>
          <div class="spacer"></div>
          <button mat-button color="primary" [routerLink]="['/']">
            <mat-icon>home</mat-icon> Home
          </button>
        </mat-card-header>
        <mat-card-content>
          <div class="search-container">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Search Products</mat-label>
              <input matInput (keyup)="applyFilter($event)" placeholder="Search by name, category, etc." #input>
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>
          </div>

          <mat-tabs>
            <mat-tab label="Table View">
              <div class="table-container">
                <table mat-table [dataSource]="filteredProducts" matSort (matSortChange)="sortData($event)" class="full-width">
                  <!-- Image Column -->
                  <ng-container matColumnDef="image">
                    <th mat-header-cell *matHeaderCellDef> Image </th>
                    <td mat-cell *matCellDef="let product">
                      <img [src]="product.imageUrl" alt="{{ product.name }}" class="product-thumbnail">
                    </td>
                  </ng-container>

                  <!-- ID Column -->
                  <ng-container matColumnDef="id">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header> ID </th>
                    <td mat-cell *matCellDef="let product"> {{product.id}} </td>
                  </ng-container>

                  <!-- Name Column -->
                  <ng-container matColumnDef="name">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header> Name </th>
                    <td mat-cell *matCellDef="let product"> {{product.name}} </td>
                  </ng-container>

                  <!-- Category Column -->
                  <ng-container matColumnDef="category">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header> Category </th>
                    <td mat-cell *matCellDef="let product"> {{product.category}} </td>
                  </ng-container>

                  <!-- Price Column -->
                  <ng-container matColumnDef="price">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header> Price </th>
                    <td mat-cell *matCellDef="let product"> {{product.price | currency}} </td>
                  </ng-container>

                  <!-- Quantity Column -->
                  <ng-container matColumnDef="quantity">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header> Quantity </th>
                    <td mat-cell *matCellDef="let product"> {{product.quantity}} </td>
                  </ng-container>

                  <!-- Last Updated Column -->
                  <ng-container matColumnDef="lastUpdated">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header> Last Updated </th>
                    <td mat-cell *matCellDef="let product"> {{product.lastUpdated | date:'medium'}} </td>
                  </ng-container>

                  <!-- Actions Column -->
                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef> Actions </th>
                    <td mat-cell *matCellDef="let product">
                      <div class="action-buttons">
                        <button mat-icon-button color="primary" (click)="editProduct(product)">
                          <mat-icon>edit</mat-icon>
                        </button>
                        <button mat-icon-button color="warn" (click)="deleteProduct(product.id)">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

                  <!-- Row shown when there is no matching data. -->
                  <tr class="mat-row" *matNoDataRow>
                    <td class="mat-cell" colspan="8">No data matching the filter "{{input.value}}"</td>
                  </tr>
                </table>

                <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" 
                              [pageSize]="10"
                              showFirstLastButtons
                              aria-label="Select page of products"
                              (page)="handlePageEvent($event)">
                </mat-paginator>
              </div>
            </mat-tab>
            
            <mat-tab label="Grid View">
              <div class="grid-container">
                <div *ngIf="filteredProducts.length === 0" class="no-data">
                  No products found matching your search.
                </div>
                <div class="product-grid">
                  <mat-card *ngFor="let product of filteredProducts" class="product-card">
                    <img mat-card-image [src]="product.imageUrl" alt="{{ product.name }}" class="product-image">
                    <mat-card-header>
                      <mat-card-title>{{ product.name }}</mat-card-title>
                      <mat-card-subtitle>{{ product.category }}</mat-card-subtitle>
                    </mat-card-header>
                    <mat-card-content>
                      <p class="product-description">{{ product.description }}</p>
                      <div class="product-details">
                        <p><strong>Price:</strong> {{ product.price | currency }}</p>
                        <p><strong>In Stock:</strong> {{ product.quantity }}</p>
                      </div>
                    </mat-card-content>
                    <mat-card-actions>
                      <button mat-button color="primary" (click)="editProduct(product)">
                        <mat-icon>edit</mat-icon> EDIT
                      </button>
                      <button mat-button color="warn" (click)="deleteProduct(product.id)">
                        <mat-icon>delete</mat-icon> DELETE
                      </button>
                    </mat-card-actions>
                  </mat-card>
                </div>
              </div>
            </mat-tab>
          </mat-tabs>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="addProduct()">
            <mat-icon>add</mat-icon> Add New Product
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .search-container {
      margin-bottom: 20px;
    }
    
    .table-container {
      overflow-x: auto;
      margin-top: 20px;
    }
    
    table {
      width: 100%;
    }
    
    .mat-column-actions {
      width: 120px;
    }
    
    .mat-column-image {
      width: 80px;
    }
    
    .product-thumbnail {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
    
    .grid-container {
      margin-top: 20px;
    }
    
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }
    
    .product-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .product-image {
      height: 200px;
      object-fit: cover;
    }
    
    .product-description {
      height: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    
    .product-details {
      margin-top: 10px;
    }
    
    mat-card-actions {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
    }
    
    .no-data {
      text-align: center;
      padding: 20px;
      color: #666;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .container {
      padding: 20px;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  displayedColumns: string[] = ['image', 'id', 'name', 'category', 'price', 'quantity', 'lastUpdated', 'actions'];

  constructor(
    private inventoryService: InventoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.inventoryService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = [...products];
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.products.filter(product => 
      product.name.toLowerCase().includes(filterValue) ||
      product.category.toLowerCase().includes(filterValue) ||
      product.description.toLowerCase().includes(filterValue)
    );
  }

  sortData(sort: Sort): void {
    const data = [...this.filteredProducts];
    if (!sort.active || sort.direction === '') {
      this.filteredProducts = data;
      return;
    }

    this.filteredProducts = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'category': return this.compare(a.category, b.category, isAsc);
        case 'price': return this.compare(a.price, b.price, isAsc);
        case 'quantity': return this.compare(a.quantity, b.quantity, isAsc);
        case 'lastUpdated': return this.compare(a.lastUpdated.getTime(), b.lastUpdated.getTime(), isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  handlePageEvent(event: PageEvent): void {
    // Handle pagination if needed
  }

  addProduct(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '600px',
      data: { product: null, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inventoryService.addProduct(result);
      }
    });
  }

  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '600px',
      data: { product: {...product}, isNew: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inventoryService.updateProduct(result);
      }
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.inventoryService.deleteProduct(id);
    }
  }
}