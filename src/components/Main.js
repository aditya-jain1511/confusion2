//act as psuedo container component for my webpage application, most of the work from app.js will be  moved here. it wont be rendering any views, as it wont be rendering any views

import React, {Component} from 'react';
import Menu from "./MenuComponent";
import {DISHES} from '../shared/dishes';
import DishDetail from "./DishDetail";
import Header from './Header';
import Footer from './Footer';

class Main extends Component{

  constructor(props){
    super(props);

    this.state={
      dishes: DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dishID){
    this.setState({
        selectedDish: dishID
    })
  }

  renderDish(dishID){
    if(dishID!=null){
        return(
            <div className="container">
              <DishDetail dish = {dishID}/>
            </div>
        )
    } 
  }


  render(){
    return (
      <>
        <Header />
        <Menu dishes={this.state.dishes} onClick={
            (dishID)=>this.onDishSelect(dishID)
        }/>
        {this.renderDish(this.state.selectedDish)}
        <Footer />
      </>
    );
  }
}

export default Main;
