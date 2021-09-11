import React from "react";
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

const RenderComment = ({dish})=>{
    
    const com= dish.comments.map((comment)=>{
        return(
            <CardText key={comment.id}>
                {comment.comment}<br></br>
                -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
            </CardText>  
        )
    });

    return(
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardBody>
                    <CardTitle><h5>Comments:</h5></CardTitle>
                    {com}
                </CardBody>
            </Card>
        </div>
    )
}

const RenderDish = ({dish})=>{
    return(
        <div key={dish.id} className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

const DishDetail = (props)=>{
    return(
        <div className="row">
            <RenderDish dish={props.dish}></RenderDish>
            <RenderComment dish={props.dish} />
        </div>
    )
}

export default DishDetail;