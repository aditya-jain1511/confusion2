import React, { Component } from "react";
import {Card, CardImg, CardImgOverlay,  CardTitle} from 'reactstrap';
import DishDetail from "./DishDetail";

class Menu extends Component{
    constructor(props){
        super(props);

        this.state={
            selectedDish:null
        }
    }

    onDishSelect(dish){
        this.setState({
            selectedDish: dish
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

      RenderMenuItem(dish){
        return (
            <Card onClick={() => this.onDishSelect(dish)}>
                <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Card>
        );
      }


    render(){
        const menubar= this.props.dishes.map((dish)=>{
            return(
                <div key={dish.id} className="col-12 col-md-6 mt-3 mb-1">
                    {this.RenderMenuItem(dish)}
                </div>
            );
        });

        return(
            <div className="container">
                <div className="row">
                    {menubar}
                </div>
                {this.renderDish(this.state.selectedDish)}
            </div>
        );
    }
}        


export default Menu;