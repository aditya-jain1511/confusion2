import React , {Component} from "react";
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Modal, ModalBody, ModalHeader, Button, Form, FormGroup, Input, Label, Col} from 'reactstrap';
import {NavLink} from 'react-router-dom';


class Header extends Component{
    constructor(props){
        super(props);

        this.state={
            isNavOpen:false,
            isLogModalOpen:false,
            isResModalOpen:false,
        }
        this.toggleNav=this.toggleNav.bind(this);
        this.toggleLogModal=this.toggleLogModal.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
        this.handleRes=this.handleRes.bind(this);
        this.toggleReserve=this.toggleReserve.bind(this);
    }

    toggleNav(){
        if (this.state.isNavOpen===false){
            this.setState({isNavOpen:true});
        }
        else{
            this.setState({isNavOpen:false});
        }
    }

    toggleLogModal() {
        this.setState({
            isLogModalOpen: !this.state.isLogModalOpen
        });
    }

    toggleReserve(){
        this.setState({
            isResModalOpen: !this.state.isResModalOpen
        });
    }

    handleLogin(event) {
        this.toggleLogModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value + " Remember: " + this.remember.checked);
        event.preventDefault();
    }

    handleRes(event){
        this.toggleReserve();
        alert("Number of Guests: "+ this.guests.value+ " Section: "+this.section.value+ " Date: "+ this.date.value+ " Time: "+ this.time.value);
        event.preventDefault();
    }

    render(){
        return(
            <>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"> <img src="assets/images/logo.png" alt="logo" height="100%" width="50" /> Ristorante Con Fusion </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/home">
                                    <span className="fa fa-home fa-lg"></span> Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/about">
                                    <span className="fa fa-info fa-lg"></span> About
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/menu">
                                    <span className="fa fa-list fa-lg"></span> Menu
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/contact">
                                    <span className="fa fa-address-card fa-lg"></span> Contact
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Button onClick={this.toggleLogModal} color="primary">
                                    <span className="fa fa-sign-in fa-lg"></span>Login
                                </Button>
                            </NavItem>
                        </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                            <div className="col-12 col-sm-2 offset-sm-1 align-self-center">
                                <Button color="warning" className="btn btn-block btn-sm btn-warning reservebutton" onClick={this.toggleReserve}>Reserve a Table</Button>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isLogModalOpen} toggle={this.toggleLogModal}>
                    <ModalHeader toggle={this.toggleLogModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup row>
                                <Label htmlFor="username" md={2}>Username</Label>
                                <Col md={10}>
                                    <Input type="text" id="username" name="username" innerRef={(input)=> this.username=input}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="password" md={2}>Password</Label>
                                <Col md={10}>
                                    <Input type="password" id="password" name="password" innerRef={(input)=> this.password=input}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 6, offset:2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name= "remember" innerRef={(input)=> this.remember=input}></Input>
                                        <strong>Remember me?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <Button type="submit" value="submit" color="primary" className="btn-block">Login</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isResModalOpen} toggle={this.toggleReserve} className="modal-lg">
                    <ModalHeader toggle={this.toggleReserve}>Reserve a Table</ModalHeader> 
                    <ModalBody>
                        <Form onSubmit={this.handleRes}>
                            <FormGroup row tag="guests" className="align-items-center">
                                <Label htmlFor="guests" md={2}>Number Of Guests</Label>
                                <Col md={10}>
                                    <Input type="select" name="guests" innerRef={(input)=>this.guests=input}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                    </Input> 
                                </Col>
                            </FormGroup>
                            <FormGroup row tag="section" className="align-items-center">
                                <Label htmlFor="section" md={2}>Section</Label>
                                <Col md={10}>
                                <Input type="select" name="section" innerRef={(input)=>this.section=input}>
                                        <option value="smoking">Smoking</option>
                                        <option value="non-smoking">Non Smoking</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={2} htmlFor="date">Date and Time</Label>
                                <Col md={5}>
                                    <Input type="date" name="date" innerRef={(input)=> this.date=input} />
                                </Col>
                                <Col md={5}>
                                    <Input type="time" name="time" innerRef={(input)=> this.time=input} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 6, offset:2}}>
                                    <Button type="submit" value="submit" color="primary" className="btn-block">Reserve</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>                   
                </Modal>
            </>
        )
    }
}

export default Header;