import { Component , OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
   
   products:Product[] = [];
   categories:string[] =[];
   loading:boolean = false; 
   cartProducts:any[] = [];
   constructor(private service: ProductsService){}

   ngOnInit(): void {
      this.getProducts();
      this.getCategories();
   }

   getProducts(){
      this.loading = true;
     this.service.getAllProducts().subscribe((res:any) => {
        this.products = res;
        this.loading = false;
      }
        , (error) => {
         this.loading = false;
         alert(error.message);
      }
     )
   }

   getCategories() {
      this.loading = true;
      this.service.getAllCategories().subscribe(
         (res:any)=>{
             this.categories = res;
             this.loading = false;
            } ,
        (error) => {
         this.loading = false;
         alert(error.message);
      }
         )
   }

   

   filterCategory(event:any){
      let value = event.target.value; // get the value that the user enter

      (value == 'all') ? this.getProducts() : this.getProductsCategory(value) ;
      }

   getProductsCategory(keyword:string) {
      this.loading = true;
      this.service.getProductsByCategory(keyword).subscribe(
         (res:any) => { 
            this.loading = false;
            this.products = res; 
         } ,
         (error) =>{ 
            this.loading = false;
            alert(error.message);
         })
   } // update the list of products depends on the keyword filter that the user choose 


   addToCart(event:any){
      if("cart" in localStorage){
         this.cartProducts = JSON.parse(localStorage.getItem("cart")!); // get the data from the local storage (! in case the data is null)
         let exist = this.cartProducts.find(item => item.item.id == event.item.id);
         if(exist){
          alert("products already in your cart !!");
         }else{
         this.cartProducts.push(event);
         localStorage.setItem("cart",JSON.stringify(this.cartProducts));  // this in case that the local storage already has cart so we get it than we push the new data in it than we put back to the local storage  
         }
      }else{
         this.cartProducts.push(event);
         localStorage.setItem("cart",JSON.stringify(this.cartProducts));      
      }
   }
}
