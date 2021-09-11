//act as psuedo container component for my webpage application, most of the work from app.js will be  moved here. it wont be rendering any views, as it wont be rendering any views

import React, {Component} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import Menu from "./MenuComponent";
import {DISHES} from '../shared/dishes';
import DishDetail from "./DishDetail";


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
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/"> Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} onClick={
            (dishID)=>this.onDishSelect(dishID)
        }/>
        {this.renderDish(this.state.selectedDish)}
      </div>
    );
  }
}

export default Main;
