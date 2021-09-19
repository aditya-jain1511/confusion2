import React, {Component} from "react";
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Label,Row, Col, Modal, ModalBody, ModalHeader} from 'reactstrap';
import {Link} from 'react-router-dom';
import { LocalForm, Control, Errors } from "react-redux-form";

const required= (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);

        this.state={
            isComModalOpen:false,    
        }

        this.toggleComModal=this.toggleComModal.bind(this)
        this.addComment=this.addComment.bind(this)
    }

    toggleComModal() {
        this.setState({
            isComModalOpen: !this.state.isComModalOpen
        });
    }

    addComment(values) {
        this.toggleComModal();
        alert("Current state is: "+JSON.stringify(values));
        console.log("Current state is: "+JSON.stringify(values));
    }

    render(){
        return(
            <>
                <Button outline onClick={this.toggleComModal} color="secondary">
                    <span className="fa fa-pencil fa-lg"></span>Add Comment
                </Button>
                <Modal isOpen={this.state.isComModalOpen} toggle={this.toggleComModal}>
                    <ModalHeader toggle={this.toggleComModal}>Add Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=> this.addComment(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                        <option>1</option>    
                                        <option>2</option>    
                                        <option>3</option>    
                                        <option>4</option>    
                                        <option>5</option>    
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Author</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="firstname" placeholder="Author" className="form-control" validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}/>
                                    <Errors className="text-danger" model=".author" show="touched" messages={{required: 'required ', minLength: 'must be greated than 2 charactes ', maxLength: 'must be 15 character or less '}}></Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" className="form-control" id="message" name="message" placeholder="Feedback" rows="12" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset:2}}>
                                    <Button type="submit" color="primary">Submit</Button> 
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}


const RenderComment = ({dish, comment})=>{
    
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
                    <CommentForm dish={dish} comment={comment}></CommentForm>
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
                <RenderComment dish={props.dish} comment={props.comments} />
            </div>
        </div>
        
    )
}

export default DishDetail;