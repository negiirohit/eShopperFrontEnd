import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { PagerService } from '../services/pager.service';


import { Product } from '../shared/product';
import { Cart } from '../shared/cart';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


 
  errMess: "";
 
  cartItem : {};
  cartArray: any[] = [];
  
   // array of all items to be paged
   private allItems: any[];
   private allFeaturedProducts: any[];

   // pager object
   pager: any = {};
   
   // paged items
   pagedFeaturedProducts: any[];
   
  

  constructor(private productService: ProductService, private pagerService : PagerService) { }

  ngOnInit() {
    this.productService.getFeaturedProducts()
    .subscribe(products => {      
          // set items to json response
          // initialize to page 1
          this.allFeaturedProducts = products
          this.setPage(1);

         
    },
      errmess => this.errMess = <any>errmess);
  }

  addToCart(product){

      if(localStorage.getItem('cart'))
             this.cartArray=JSON.parse(localStorage.getItem('cart'));
      this.cartItem = { product_id:product._id ,
                        product_name:product.name, 
                        product_price:product.price };
      console.log(this.cartItem);
      this.cartArray.push(this.cartItem);
      localStorage.setItem("cart",JSON.stringify(this.cartArray));
      console.log(localStorage.getItem("cart"));
  }


  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allFeaturedProducts.length, page,9);

    // get current page of items
    this.pagedFeaturedProducts = this.allFeaturedProducts.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
}
