import React from "react";
import {Card, CardImg, CardImgOverlay,  CardTitle} from 'reactstrap';

/*Construct a menu of dishes*/
function RenderMenuItem ({dish, onClick}) {
    return (
        <Card onClick={() => onClick(dish)}>
            <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
            <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
        </Card>
    );
}

const Menu=(props)=> {
    const menubar= props.dishes.map((dish)=>{
        return(
            <div key={dish.id} className="col-12 col-md-6 mt-3 mb-1">
                <RenderMenuItem dish={dish} onClick={props.onClick}/>
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
        


export default Menu;