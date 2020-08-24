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

  items : ProductDTO[] = [];
  page : number = 0;

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
    this.productService.findByCategory(category_id, this.page, 10)
      .subscribe(response => {
        let start = this.items.length;
        this.items = this.items.concat(response['content']);
        let end = this.items.length - 1;
        loader.dismiss();
        console.log(this.page);
        console.log(this.items);
        this.loadImageUrls(start, end);
      },
      error => {
        loader.dismiss();
      });
  }

  loadImageUrls(start : number, end : number){
    for (var i =start;  i <= end; i++){
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
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
  
  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
