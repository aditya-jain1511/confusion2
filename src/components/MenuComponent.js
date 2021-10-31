import React, { Component } from "react";
import {Card, CardImg, CardImgOverlay,  CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from './Loading';
import { baseUrl } from '../shared/baseUrl';

class Menu extends Component{

      RenderMenuItem(dish){
        return (
            <Card>
                <Link to={`/menu/${dish.id}`}>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}></CardImg>
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Link>       
            </Card>
        );
      }


    render(){
        const menubar= this.props.dishes.map((dish)=>{
            return(
                <div key={dish.id} className="col-12 col-sm-6 col-md-4 mt-3 mb-1">
                    {this.RenderMenuItem(dish)}
                </div>
            );
        });

        if (this.props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                    <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/home">Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12"><h3>Menu</h3><hr></hr></div>
                    </div>
                    <div className="row row-content">
                        <Loading></Loading>
                    </div>
                </div>
            )
        }
        else if(this.props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/home">Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12"><h3>Menu</h3><hr></hr></div>
                    </div>
                    <div className="row row-content">
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/home">Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12"><h3>Menu</h3><hr></hr></div>
                    </div>
                    <div className="row row-content">
                        {menubar}
                    </div>
                </div>
            );
    }
}        


export default Menu;