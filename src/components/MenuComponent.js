import React, {Component} from "react";
import {Card, CardImg, CardImgOverlay,  CardTitle} from 'reactstrap';

/*Construct a menu of dishes*/
class Menu extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const menubar= this.props.dishes.map((dish)=>{
            return(
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={()=> this.props.onClick(dish)}>
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
            </div>
        );
    }
}

export default Menu;