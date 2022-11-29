import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  host2:string="http://localhost:8080"
  jwt:string;
  username:string;
  roles:Array<string>;

  constructor(private  http: HttpClient) { }

  login(data){
    return this.http.post(this.host2+"/login",data,{observe:'response'});
  }

  saveToken(jwt: string) {
    //save ds localStorage, token:clé, jwt:value
    localStorage.setItem('token',jwt);
    this.jwt= jwt;
    this.parseJWT();
  }

  private parseJWT() {
    //pr parser jwt => install : npm install @auth0/angular-jwt
    let jwtHelperService= new JwtHelperService();
    let jwtObject=jwtHelperService.decodeToken(this.jwt);

    //recuperer username ey ses roles
    this.username=jwtObject.obj;
    this.roles=jwtObject.roles;
  }

  isAdmin(){
    //ADMIN index>=0  => existe
    return this.roles.indexOf('ADMIN')>=0;
  }
  isUser(){
    return this.roles.indexOf('USER')>=0;

  }

  isAuthenticated(){
    return this.roles && (this.isAdmin() || this.isUser());
  }

  loadToken() {
    //recuperer le token
    this.jwt=localStorage.getItem('token');

    //je recharge les données, pas besoin de s'authentifier a chaque fois
    this.parseJWT();
  }

  logout() {
    //reinitialiser les parametres et supprimer le token
    localStorage.removeItem('token');
    this.initParams();

  }

  initParams(){
    this.jwt=undefined;
    this.username=undefined;
    this.roles=undefined;
  }
}
