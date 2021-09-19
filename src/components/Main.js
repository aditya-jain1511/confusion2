//act as psuedo container component for my webpage application, most of the work from app.js will be  moved here. it wont be rendering any views, as it wont be rendering any views

import React, {Component} from 'react';
import Menu from "./MenuComponent";
import Home from './Home';
import Contact from './Contact';
import About from './About';
import Header from './Header';
import Footer from './Footer';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import DishDetail from './DishDetail';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component{

  constructor(props){
    super(props);

  }


  render(){

    const Homepage = ()=>{
      return(
        <Home 
        dish={this.props.dishes.filter((dish)=>dish.featured)[0]}
        promo={this.props.promotions.filter((promo)=>promo.featured)[0]}
        lead={this.props.leaders.filter((lead)=>lead.featured)[0]} 
        />
      )
    }

    const MenuPage= ()=>{
      return(
        <Menu 
          dishes={this.props.dishes}
        />
      )
    }

    const DishWithId= ({match})=>{
      return(
        <DishDetail 
          dish={this.props.dishes.filter((dish)=> dish.id=== parseInt(match.params.dishId,10))[0]} 
          comments={this.props.comments.filter((comment)=> comment.dishId===parseInt(match.params.dishId,10))}
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
          <Route exact path="/about" component={()=><About leaders={this.props.leaders}/>} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
