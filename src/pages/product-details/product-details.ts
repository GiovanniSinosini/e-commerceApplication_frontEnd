import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDTO } from '../../models/product.dto';
import { ProductService } from '../../services/domain/product.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  item : ProductDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productService: ProductService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let product_id = this.navParams.get('product_id');
    this.productService.findById(product_id)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
      },
      error => {});
  }

  getImageUrlIfExists(){
    this.productService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}prod${this.item.id}-small.jpg`;
      },
      error => {});
  }

  addToCart(product: ProductDTO){
    this.cartService.addProduct(product);
    this.navCtrl.setRoot('CartPage');

  }

}
