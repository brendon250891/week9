import { isEmptyExpression, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public product: Product = {
    id: null,
    name: "",
    description: "",
    price: null,
    units: 0,
  }

  constructor(private route: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getNextId().subscribe(response => {
      this.product.id = response.next;
    });
  }

  public cancel(): void {
    this.route.navigateByUrl('products');
  }

  public addProduct(): void {
    if (!this.isEmpty(this.product)) {
      this.productService.addProduct(this.product).subscribe(response => {
        if (response.ok) {
          this.route.navigateByUrl('products');
        }
      });
    }
  }

  private isEmpty(product: Product): boolean {
    return product.id == null && product.name == "" && product.description == "" && product.price == null;
  }
}
