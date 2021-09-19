import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Label, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

class Contact extends Component{
    constructor(props){
        super (props);

        this.handleSubmit= this.handleSubmit.bind(this);
    }

    handleSubmit(values){
        alert("Current state is: "+JSON.stringify(values));
        console.log("Current state is: "+JSON.stringify(values));
    }

    render(){

        return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/home">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Contact</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12"><h3>Contact</h3><hr></hr></div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div role="group">
                        <a role="button" className="btn btn-primary mr-1" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <button className="btn btn-info mr-1"><i className="fa fa-skype"></i> Skype</button>
                        <a role="button" className="btn btn-success mr-1" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
            <div className= "row row-content">
                <div className = "col-12">
                    <h3>Send us Feedback</h3>
                </div>
                <div className = "col-12 col-md-9">
                    <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="firstname" md={2}>First Name</Label>
                            <Col md={10}>
                                <Control.text model=".firstname" id="firstname" name="firstname" placeholder="First Name" className="form-control" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="lastname" md={2}>Last Name</Label>
                            <Col md={10}>
                                <Control.text model=".lastname" className="form-control" id="lastname" name="lastname" placeholder="Last Name" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                            <Col md={10}>
                                <Control.text model=".telnum" className="form-control" id="telnum" name="telnum" placeholder="Contact tel."></Control.text>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="email" md={2}>Email</Label>
                            <Col md={10}>
                                <Control.text model=".email" className="form-control" id="email" name="email" placeholder="Email ID"></Control.text>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size:6, offset:2}}>
                                <div className="form-check">
                                    <Label check>
                                        <Control.checkbox model=".agree" className="form-check-input" name= "agree" />
                                        <strong>May we contact you?</strong>
                                    </Label>
                                </div>
                            </Col>
                            <Col md={{size:3, offset:1}}>
                                <Control.select model=".contactType" className="form-control" name="contactType">
                                    <option>Tel.</option>
                                    <option>Email</option>
                                </Control.select>
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
                                <Button type="submit" color="primary">Send Feedback</Button> 
                            </Col>
                        </Row>
                    </LocalForm>
                </div>
            </div>
        </div>
        )
    }
}

export default Contact;