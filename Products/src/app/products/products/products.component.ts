import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public allProducts: Product[] = [];
  public search: string = "";
  public message: String = "";
  public messageType: string = "";

  constructor(private productService: ProductService, private route: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  public editProduct(product: Product) {
    localStorage.setItem('editProduct', JSON.stringify(product));
    this.route.navigateByUrl(`products/${product.id}`);
  }

  public removeProduct(productId: number): void {
    this.productService.removeProduct(productId).subscribe(response => {
      this.message = response.message;
      this.messageType = response.ok ? 'bg-green-500' : 'bg-red-500';
      setTimeout(() => {
        this.message = "";
        this.messageType = "";
      }, 3000)
      this.getProducts();
    });
  }

  public addProduct(): void {
    this.route.navigateByUrl('products/create');
  }

  public searchChanged() {
    // this.getProducts();
    this.allProducts = this.allProducts.filter(product => {
      return product.name.indexOf(this.search) > 0;
    });
  }

  private getProducts(): void {
    this.productService.getAllProducts().subscribe(response => {
      this.allProducts = response.products;
    });
  }
}
