//act as psuedo container component for my webpage application, most of the work from app.js will be  moved here. it wont be rendering any views, as it wont be rendering any views

import React, {Component} from 'react';
import Menu from "./MenuComponent";
import Home from './Home';
import Contact from './Contact';
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';
import Header from './Header';
import Footer from './Footer';
import {Switch, Route, Redirect} from 'react-router-dom';

class Main extends Component{

  constructor(props){
    super(props);

    this.state={
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }


  render(){

    const Homepage = ()=>{
      return(
        <Home 
        dish={this.state.dishes.filter((dish)=>dish.featured)[0]}
        promo={this.state.promotions.filter((promo)=>promo.featured)[0]}
        lead={this.state.leaders.filter((lead)=>lead.featured)[0]} 
        />
      )
    }

    const MenuPage= ()=>{
      return(
        <Menu 
          dishes={this.state.dishes}
          comments={this.state.comments}
        />
      )
    }

    return (
      <>
        <Header />
        <Switch>
          <Route path= "/home" component={Homepage} />
          <Route exact path="/menu" component={MenuPage}></Route>
          <Route path="/contact" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default Main;
