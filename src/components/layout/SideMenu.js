import './SideMenu.scss'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {AuthContext} from 'components/Auth'

export default class SideMenu extends Component {
    
  static contextType = AuthContext;

    render() {
      let auth1 = null;
      function UserInfo({auth, context}) {
        if(auth && auth.isLoggedIn) return (
          <>
            <div className="image">
              <img src={auth.user.picture} className="img-circle elevation-2" alt={'UserImage'} />
            </div>
            <div className="info">
              <span href="#" className="d-block" style={{color: 'white'}}>{auth.user.fullName}</span>
            </div>
            
          </>
        )
        
        return (
          <div className="d-block mx-auto info" style={{color: 'white'}}>
            <span>Not logged in</span>
          </div>
        )
      }

      const LogoutButton = ({ auth }) => {
        if(auth && auth.jwt) return (
        <>
          <li className="nav-item nav-item-logout">
            <button type="button" className="nav-link btn btn-link" onClick={this.props.logout}>
              <i className="nav-icon fas fa-sign-out-alt" />
              <p>
                Logout
              </p>
            </button>
          </li>
        </>
        )
        return (
          <li className="nav-item nav-item-logout">
            <button type="button" className="nav-link btn btn-link" onClick={this.props.handleLoginClicked}>
              <i className="nav-icon fas fa-sign-in-alt" />
              <p>Login</p>
            </button>
          </li>
        )
      }


      
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <a href="index3.html" className="brand-link">
    <img src={process.env.PUBLIC_URL+"/dist/img/AdminLTELogo.png"} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">DVD Rental</span>
  </a>
  {/* Sidebar */}
  <AuthContext.Consumer>
    {auth => {return (
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    
          <>
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <UserInfo auth={auth} context={this}/>
            </div>
          </>  
    
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
         <LogoutButton auth={auth}/>
        <li className="nav-item">
          <Link to="/movies" className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
              Movies
            </p>
          </Link>
        </li>
      </ul>
    </nav>
  </div>
  )} 
  }
  </AuthContext.Consumer>
</aside>

        )
    }
}