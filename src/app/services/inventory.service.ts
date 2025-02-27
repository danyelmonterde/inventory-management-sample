import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      description: 'High-performance laptop with 16GB RAM and SSD storage. Perfect for work and gaming.',
      price: 1200,
      quantity: 15,
      category: 'Electronics',
      imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format',
      lastUpdated: new Date()
    },
    {
      id: 2,
      name: 'Desk Chair',
      description: 'Ergonomic office chair with lumbar support and adjustable height. Comfortable for long working hours.',
      price: 250,
      quantity: 30,
      category: 'Furniture',
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format',
      lastUpdated: new Date()
    },
    {
      id: 3,
      name: 'Wireless Mouse',
      description: 'Bluetooth wireless mouse with ergonomic design and long battery life. Compatible with all devices.',
      price: 35,
      quantity: 50,
      category: 'Electronics',
      imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format',
      lastUpdated: new Date()
    },
    {
      id: 4,
      name: 'Bookshelf',
      description: 'Modern 5-tier bookshelf with sturdy construction. Perfect for home or office organization.',
      price: 120,
      quantity: 10,
      category: 'Furniture',
      imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&auto=format',
      lastUpdated: new Date()
    },
    {
      id: 5,
      name: 'Coffee Maker',
      description: 'Programmable coffee maker with 12-cup capacity and auto shut-off feature. Makes perfect coffee every time.',
      price: 89,
      quantity: 25,
      category: 'Electronics',
      imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&auto=format',
      lastUpdated: new Date()
    },
    {
      id: 6,
      name: 'Desk Lamp',
      description: 'LED desk lamp with adjustable brightness and color temperature. Energy-efficient and stylish.',
      price: 45,
      quantity: 40,
      category: 'Furniture',
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format',
      lastUpdated: new Date()
    }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);

  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  addProduct(product: Product): void {
    // Generate a new ID (in a real app, this would be handled by the backend)
    const newId = Math.max(...this.products.map(p => p.id), 0) + 1;
    const newProduct = {
      ...product,
      id: newId,
      lastUpdated: new Date()
    };
    
    this.products = [...this.products, newProduct];
    this.productsSubject.next(this.products);
  }

  updateProduct(updatedProduct: Product): void {
    this.products = this.products.map(product => 
      product.id === updatedProduct.id 
        ? { ...updatedProduct, lastUpdated: new Date() } 
        : product
    );
    this.productsSubject.next(this.products);
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
    this.productsSubject.next(this.products);
  }

  updateStock(id: number, quantity: number): void {
    const product = this.products.find(p => p.id === id);
    if (product) {
      const updatedProduct = {
        ...product,
        quantity,
        lastUpdated: new Date()
      };
      this.updateProduct(updatedProduct);
    }
  }
}