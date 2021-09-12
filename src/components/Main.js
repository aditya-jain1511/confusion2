//act as psuedo container component for my webpage application, most of the work from app.js will be  moved here. it wont be rendering any views, as it wont be rendering any views

import React, {Component} from 'react';
import Menu from "./MenuComponent";
import Home from './Home';
import {DISHES} from '../shared/dishes';
import Header from './Header';
import Footer from './Footer';
import {Switch, Route, Redirect} from 'react-router-dom';

class Main extends Component{

  constructor(props){
    super(props);

    this.state={
      dishes: DISHES,
    };
  }


  render(){

    const HomePage=()=>{
      return(
        <Home></Home>
      )
    }

    return (
      <>
        <Header />
        <Switch>
          <Route path= "/home" component={HomePage} />
          <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes}/>}></Route>
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default Main;
