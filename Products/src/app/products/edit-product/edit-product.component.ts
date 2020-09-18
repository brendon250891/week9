import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  public product: Product;

  constructor(private productService: ProductService, private route: Router) { }

  ngOnInit(): void {
    let editProduct = localStorage.getItem('editProduct');
    if (editProduct) {
      this.product = JSON.parse(editProduct);
    }
  }

  public cancel(): void {
    this.route.navigateByUrl('products');
  }

  public updateProduct(): void {
    this.productService.updateProduct(this.product).subscribe(response => {
      if (response.ok) {
        this.route.navigateByUrl('products');
      }
    })
  }
}
