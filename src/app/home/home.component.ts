import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../shared/product';
import { Cart } from '../shared/cart';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  FeaturedProducts: Product[];
  errMess: "";
 
  cartItem : {};
  
  
  cartArray: Cart[]= [];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getFeaturedProducts()
    .subscribe(products => this.FeaturedProducts = products,
      errmess => this.errMess = <any>errmess);
  }

  addToCart(product){

      if(localStorage.getItem('cart'))
             this.cartArray=JSON.parse(localStorage.getItem('cart'));
      this.cartItem = { product_id:product._id ,
                        product_name:product.name, 
                        product_price:product.price };
     // product_id = product._id;
    
      console.log(this.cartItem);
      this.cartArray.push(this.cartItem);
      localStorage.setItem("cart",JSON.stringify(this.cartArray));
      console.log(localStorage.getItem("cart"));
  }
}
