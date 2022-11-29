import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private  authenticationService:AuthenticationService,private  router:Router) { }

  ngOnInit(): void {
  }

  onLogin(data){
    //console.log(data);
    this.authenticationService.login(data)
      .subscribe(resp=>{
        console.log(resp);
        console.log(resp.headers.get('Authorization'));

        //recuperer jwt
        let jwt= resp.headers.get('Authorization');
        this.authenticationService.saveToken(jwt);
        //une fois authentifié je suis sur route de base
        this.router.navigateByUrl("/");
      },err=>{

    })
  }




}



