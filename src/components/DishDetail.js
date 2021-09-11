import React, {Component} from "react";
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';


class DishDetail extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const com= this.props.dish.comments.map((comment)=>{
            return(
                <div>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    <br></br>
                </div>  
            )
        });

        

        return(
            <div className="container">
            <div className="row">
                <div key={this.props.dish.id} className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name}></CardImg>
                        <CardBody>
                            <CardTitle>{this.props.dish.name}</CardTitle>
                            <CardText>{this.props.dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardBody>
                            <CardText><p>Comments:</p>{com}</CardText>
                        </CardBody>
                    </Card>
                </div>
            </div>
            </div>
        )
    }
}
export default DishDetail;