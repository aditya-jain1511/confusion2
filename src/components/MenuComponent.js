import React, {Component} from "react";
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';
import DishDetail from "./DishDetail";

/*Construct a menu of dishes*/
class Menu extends Component{
    constructor(props){
        super(props);

        this.state = {
            selectedDish :null,
        }
    }

componentDidMount(){
    
}

    onDishSelect(dish){
        this.setState({
            selectedDish:dish,
        })
    }

    renderDish(dish){
        if(dish!=null){
            return(
                <DishDetail dish = {dish} />
            )
        }
        else{
            return (<div></div>)
        }
    }

    render(){
        const menubar= this.props.dishes.map((dish)=>{
            return(
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={()=> this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        return(
            <div className="container">
                <div className="row">
                    {menubar}
                </div>
                <div>
                    {this.renderDish(this.state.selectedDish)}
                </div>
            </div>
        );
    }
}

export default Menu;