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
import { addComment,fetchDishes,fetchComments,fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating,author,comment) => dispatch(addComment(dishId, rating,author,comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
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
        lead={this.props.leaders.filter((lead)=>lead.featured)[0]} 
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
          addComment={this.props.addComment}
        />
      )
    }

    return (
      <>
        <Header />
        <Switch>
          <Route path= "/home" component={Homepage} />
          <Route exact path="/menu" component={MenuPage}></Route>
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contact" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}></Contact>} />
          <Route exact path="/about" component={()=><About leaders={this.props.leaders}/>} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
