import React from "react";
import {Card, CardImg, CardSubtitle,  CardTitle, CardText, CardBody} from 'reactstrap';
import { Loading } from './Loading';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({item, isLoading, errMess}){
    if (isLoading) {
        return(
                <Loading />
        );
    }
    else if (errMess) {
        return(
                <h4>{errMess}</h4>
        );
    }
    else 
        return(
            <FadeTransform in 
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)',
                }}>
                
            <Card>
                <CardImg src={baseUrl + item.image} alt={item.name}></CardImg>
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle>:null }
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        )
}

export default function Home(props){
    console.log("that: "+ JSON.stringify(props));

    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} isLoading={props.dishesLoading} errMess={props.dishesErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promo} isLoading={props.promosLoading} errMess={props.promosErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.lead} isLoading={props.leadLoading} errMess={props.leadErrMess} />
                </div>
            </div>
        </div>
    );
}


