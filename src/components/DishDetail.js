import React, {Component} from "react";
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Label,Row, Col, Modal, ModalBody, ModalHeader} from 'reactstrap';
import {Link} from 'react-router-dom';
import { LocalForm, Control, Errors } from "react-redux-form";
import { Loading } from "./Loading";
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Stagger, Fade} from 'react-animation-components'

const required= (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        console.log(props)
        super(props);

        this.state={
            isComModalOpen:false,    
        }

        this.toggleComModal=this.toggleComModal.bind(this)
        this.addComm=this.addComm.bind(this)
    }

    toggleComModal() {
        this.setState({
            isComModalOpen: !this.state.isComModalOpen
        });
    }

    addComm(values) {
        this.toggleComModal();
        alert("Current state is: "+JSON.stringify(values));
        console.log("Current state is: "+JSON.stringify(values));
        this.props.postComment(this.props.dish.id, values.rating, values.author, values.message)
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
                        <LocalForm onSubmit={(values)=> this.addComm(values)}>
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


const RenderComment = ({dish, comment, postComment})=>{
    
    const com= comment.map((comment)=>{
        return(
            <Fade in>
                <CardText key={comment.id}>
                    {comment.comment}<br></br>
                    -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}<hr></hr>
                </CardText>  
            </Fade>
        )
    });

    return(
        <div className="col-12 col-md-6 mt-3 mb-1">
            <Card>
                <CardBody>
                    <CardTitle><h5>Comments:</h5></CardTitle>
                    <Stagger in>
                        {com}
                    </Stagger>
                    <CommentForm dish={dish} comment={comment} postComment={postComment}></CommentForm>
                </CardBody>
            </Card>
        </div>
    )
}

const RenderDish = ({dish})=>{
    return(
        <div key={dish.id} className="col-12 col-md-6 mt-3 mb-1">
            <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
                <Card>
                    <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    )
}

const DishDetail = (props)=>{
    if (props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading></Loading>
                </div>
            </div>
        )
    }
    else if(props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    else if (props.dish!=null){

        return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/menu">??? Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12"><h3>{props.dish.name}</h3><hr></hr></div>
            </div>
            <div className="row row-content">
                <RenderDish dish={props.dish}></RenderDish>
                <RenderComment dish={props.dish} comment={props.comments} postComment={props.postComment} />
            </div>
        </div>
        
        )
    }
}

export default DishDetail;