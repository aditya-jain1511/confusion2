//act as psuedo container component for my webpage application, most of the work from app.js will be  moved here. it wont be rendering any views, as it wont be rendering any views

import React, {Component} from 'react';
import Menu from "./MenuComponent";
import Home from './Home';
import Contact from './Contact';
import About from './About';
import Header from './Header';
import Footer from './Footer';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import DishDetail from './DishDetail';
import { postComment, postFeedback ,fetchDishes,fetchComments,fetchPromos,fetchLead } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating,author,comment) => dispatch(postComment(dishId, rating,author,comment)),
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLead: () => {dispatch(fetchLead())},
  resetFeedbackForm:()=> {dispatch(actions.reset('feedback'))},
});

class Main extends Component{

  constructor(props){
    super(props);

  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLead();
  }


  render(){

    const Homepage = ()=>{
      return(
        <Home 
        dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMess}
        promo={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
        promosLoading={this.props.promotions.isLoading}
        promosErrMess={this.props.promotions.errMess}
        lead={this.props.leaders.leaders.filter((lead)=>lead.featured)[0]} 
        leadLoading={this.props.leaders.isLoading}
        leadErrMess={this.props.leaders.errMess}
        />
      )
    }

    const MenuPage= ()=>{
      return(
        <Menu 
          dishes={this.props.dishes.dishes}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
        />
      )
    }

    const DishWithId= ({match})=>{
      return(
        <DishDetail 
          dish={this.props.dishes.dishes.filter((dish)=> dish.id=== parseInt(match.params.dishId,10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess} 
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      )
    }

    return (
      <>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch location={this.props.location}>
              <Route path= "/home" component={Homepage} />
              <Route exact path="/menu" component={MenuPage}></Route>
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route exact path="/contact" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}></Contact>} />
              <Route exact path="/about" component={()=> <About 
                leaders={this.props.leaders.leaders} 
                leadLoading={this.props.leaders.isLoading}
                leadErrMess={this.props.leaders.errMess}
              />} />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
