import React, { createContext } from 'react'
import {MovieService} from 'service/MovieService'


export class Auth {
    constructor({jwt = '', user}) {
        this.jwt = jwt;
        this.user = user;
        this.service = new MovieService(jwt);
    }
  
    get isLoggedIn() {
      if(this.user && this.user.username) return true;
      return false;
    }
  
    get isAdmin() {
      return this.isLoggedIn && this.user.admin;
    }

    logout() {
      this.jwt = '';
      this.user = {};
      localStorage.removeItem("auth");
    }
  }

  

  export const AuthContext = createContext();

  export const AuthProvider = props => {

    return (
        <AuthContext.Provider value={props.value}>
            {props.children}
        </AuthContext.Provider>
    )
  }