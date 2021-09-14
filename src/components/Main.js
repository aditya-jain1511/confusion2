//act as psuedo container component for my webpage application, most of the work from app.js will be  moved here. it wont be rendering any views, as it wont be rendering any views

import React, {Component} from 'react';
import Menu from "./MenuComponent";
import Home from './Home';
import Contact from './Contact';
import About from './About';
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';
import Header from './Header';
import Footer from './Footer';
import {Switch, Route, Redirect} from 'react-router-dom';
import DishDetail from './DishDetail';

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
        />
      )
    }

    const DishWithId= ({match})=>{
      return(
        <DishDetail 
          dish={this.state.dishes.filter((dish)=> dish.id=== parseInt(match.params.dishId,10))[0]} 
          comments={this.state.comments.filter((comment)=> comment.dishId===parseInt(match.params.dishId,10))}
        />
      )
    }

    return (
      <>
        <Header />
        <Switch>
          <Route path= "/home" component={Homepage} />
          <Route exact path="/menu" component={MenuPage}></Route>
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/about" component={()=><About leaders={this.state.leaders}/>} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default Main;
