import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductDTO } from '../../models/product.dto';
import { ProductService } from '../../services/domain/product.service';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  items : ProductDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productService: ProductService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
    }

  loadData(){
    let category_id = this.navParams.get('category_id');
    let loader = this.presentLoading();
    this.productService.findByCategory(category_id)
      .subscribe(response => {
        this.items = response['content'];
        loader.dismiss();
        this.loadImageUrls();
      },
      error => {
        loader.dismiss();
      });
  }

  loadImageUrls(){
    for (var i =0;  i < this.items.length; i++){
      let item = this.items[i];
      this.productService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}prod${item.id}-small.jpg`;
        },
        error => {})
    } 
  }

  showProductDetails(product_id : string){
    this.navCtrl.push('ProductDetailsPage', {product_id : product_id});
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
}
