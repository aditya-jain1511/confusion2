import React from "react";
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';

const RenderComment = ({comment})=>{
    
    const com= comment.map((comment)=>{
        return(
            <CardText key={comment.id}>
                {comment.comment}<br></br>
                -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
            </CardText>  
        )
    });

    return(
        <div className="col-12 col-md-6 mt-3 mb-1">
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
        <div key={dish.id} className="col-12 col-md-6 mt-3 mb-1">
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
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/menu">← Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12"><h3>{props.dish.name}</h3><hr></hr></div>
            </div>
            <div className="row row-content">
                <RenderDish dish={props.dish}></RenderDish>
                <RenderComment comment={props.comments} />
            </div>
        </div>
        
    )
}

export default DishDetail;