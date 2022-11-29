import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../catalogue.service";
import {Router} from "@angular/router";

//import jquery
import * as $ from"jquery";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private catalogueService:CatalogueService,private router:Router ) { }

  categories;
  currentCategory;


  ngOnInit(): void {

    //subscribe
    this.catalogueService.getAllCattegories()
      .subscribe(data=>{
        this.categories=data;
      }),err=>{
      console.log(err);
    }
  }

  onGetProducts(cat: any) {

    this.currentCategory=cat;

    let url= cat._links.products.href;
    //naviger sur url definie dans app-routing, btoa -> convert en string base 64 url
    this.router.navigateByUrl("/categories/" +btoa(url));
  }


}
