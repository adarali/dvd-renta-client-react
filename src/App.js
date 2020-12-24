// import './App.css';
import MovieList from 'components/movies/movie-list/MovieList'
import MovieDetail from 'components/movies/movie-detail/MovieDetail'
import MovieForm from 'components/movies/movie-form/MovieForm'
import Navbar from 'components/layout/Navbar'
import SideMenu from 'components/layout/SideMenu'
import Content from 'components/layout/Content'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React,{ useState, useEffect } from 'react';
import LoginForm from './components/login/LoginForm';
import {Auth, AuthProvider} from './components/Auth';
import { useHistory } from "react-router-dom";

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {

  useEffect(() => {
    let item = localStorage.getItem("auth");
    let auth1 = JSON.parse(item);
    if(item) {
      if(!auth.jwt || auth.jwt !== auth1.jwt) {
        setAuth(new Auth(auth1));
      }
    }
  })

  const [showLogin, setShowLogin] = useState(false);
  const toggleLogin = () => setShowLogin(!showLogin)
  const [auth, setAuth] = useState(new Auth({}))
  const contentHeader = {setTitle: () => {}}

  const root = process.env.PUBLIC_URL

  let movie = {};
  
  const movieDetailPath = "/movies/:id"
  const routes = (
    <Switch>
      <Route path={root+"/"} exact><Redirect to={root+"/movies"}/></Route>
      <Route path={root+"/movies"} exact >
        <MovieList header={contentHeader} />
      </Route>
      <Route path={root+"/movies/add"} render={(props) => <MovieForm {...props} header={contentHeader} movie={() => {}} />}/>
      <Route path={root+"/movies/edit"} render={(props) => <MovieForm {...props} header={contentHeader} movie={() => movie} />}/>
      <Route path={root+movieDetailPath} exact render={(props) => <MovieDetail {...props} header={contentHeader} handleEdit={(m, history) =>{
        movie = {...m};
        console.log("handleEdit movie", movie)
        history.push(`${root}/movies/edit`);
      }} />}/>
    </Switch>
  )

  return (
    <Router>
        <AuthProvider value={auth}>
          <div className="App wrapper">
            <ToastContainer autoClose={3000} />
            <LoginForm isOpen={showLogin} toggle={toggleLogin} loginSuccess={(auth) => {
                setAuth(new Auth(auth))
                setShowLogin(false)
                console.log("auth loginsuccess", JSON.stringify(auth))
                localStorage.setItem("auth", JSON.stringify(auth));
                }}/>
            <Navbar header={contentHeader}/>
            <SideMenu handleLoginClicked={() => setShowLogin(true)} logout={() => {
              auth.logout();
              setAuth(new Auth({}))
            }}/>
            <Content content={routes} header={contentHeader}/>
          </div>
        </AuthProvider>
      </Router>
  );
}

export default App;


