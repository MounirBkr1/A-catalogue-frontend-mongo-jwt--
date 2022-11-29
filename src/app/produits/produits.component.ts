import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../catalogue.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  products:any;

  constructor(private catalogueService:CatalogueService, private route:ActivatedRoute, private router:Router) {

    //changer contenu quand url change
    router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        //console.log("url codé:  " + route.snapshot.params['urlProds']);
        //atob  # btoa : decode url
        let url= atob(route.snapshot.params['urlProds']);
        //console.log("url decodé avec atob:  " + url);
        this.getProducts(url);
      }
    })

  }

  ngOnInit(): void {
  }

  getProducts(url){
    this.catalogueService.getRessource(url)
      .subscribe(data=>{
        this.products=data;
      },err=>{
        console.log(err);
      })
  }

}
