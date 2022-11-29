import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host : string="http://localhost:8087";

  constructor(private http:HttpClient, private authenticationService:AuthenticationService) { }

  //aficher tte les categories
  getAllCattegories(){
    return this.http.get(this.host+"/categories");
  }

  //une fois on donne url, return resultats
  getRessource(url){
    return this.http.get(url);
  }


  //delete ressources
  deletRessources(url){
    //envoyer des options,envoyer jwt authentication preceder par Bearer
    let headers= new HttpHeaders({'authorization': 'Bearer '+this.authenticationService.jwt})
    return this.http.delete(url,{headers:headers});
  }


  //Post: ona abesoin d envoyer data
  postRessources(url,data){
    //envoyer des options,envoyer jwt authentication preceder par Bearer
    let headers= new HttpHeaders({'authorization': 'Bearer '+this.authenticationService.jwt})
    return this.http.post(url,data,{headers:headers});
  }

  //Put: ona abesoin d envoyer data
  putRessources(url,data){
    //envoyer des options,envoyer jwt authentication preceder par Bearer
    let headers= new HttpHeaders({'authorization': 'Bearer '+this.authenticationService.jwt})
    return this.http.put(url,data,{headers:headers});
  }

  //Patch: modifier que l element concerné
  patchRessources(url,data){
    //envoyer des options,envoyer jwt authentication preceder par Bearer
    let headers= new HttpHeaders({'authorization': 'Bearer '+this.authenticationService.jwt})
    return this.http.patch(url,data,{headers:headers});
  }

}


