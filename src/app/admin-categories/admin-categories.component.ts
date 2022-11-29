import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../catalogue.service";
import {CategoriesComponent} from "../categories/categories.component";
import {datepickerAnimation} from "ngx-bootstrap/datepicker/datepicker-animations";

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  categories;
  mode='list';
  currentCategorie;

  constructor(private  catalogueService:CatalogueService) { }

  ngOnInit(): void {
    this.onGetAllCategories();
  }

  onGetAllCategories(){
    this.catalogueService.getAllCattegories()
      .subscribe(data=>{
        //reactualise liste categories
        this.categories=data;
      },err=>{
        console.log(err);
      })
  }

  onDeleteCat(cat: any) {
    let c= confirm("etes vous sure de vouloir supprimer?");
    if(!c) return;

    this.catalogueService.deletRessources(cat._links.self.href)
      .subscribe(data=>{
          this.onGetAllCategories();
      },err=>{
        console.log(err);
      })
  }

  onNewCategories() {
    this.mode="new-categorie";
  }

  onSaveCategorie(data: any) {
    console.log(data);

    let url=this.catalogueService.host+"/categories";
    this.catalogueService.postRessources(url,data)
      .subscribe(data=>{
        this.mode='list';
        this.onGetAllCategories();
      },error=>{
        console.log(error)
      });

  }

  onEditCat(cat: any) {
    //cat._links.self.href: id of categorie
    this.catalogueService.getRessource(cat._links.self.href)
      .subscribe(data=>{
        this.currentCategorie=data;
        this.mode="edit-categorie";
      },error=>{
        console.log(error);
      })
  }

  onUpdateCategorie(data: any) {
    this.catalogueService.putRessources(this.currentCategorie._links.self.href,data)
      .subscribe(data=>{
        this.mode='list';
        this.onGetAllCategories();
      },error=>{
        console.log(error)
      })
  }
}
