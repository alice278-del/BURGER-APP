import React ,{Component} from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';




class Checkout extends Component{

   

    checkoutCancelledHandler = () =>{
        this.props.history.goBack();

    }

    checkoutContinuedHandler= () =>{
     this.props.history.replace('/checkout/contact-data')
    }

    
render(){
    //redirect to the root page burgerBuilder

    let summary = <Redirect to ="/"/>
    //if the ingredients in not null so true
    if (this.props.ings) {
//checking if the purchase was succsesful by props purchase is true or false if it was than redirect to the root component page
    const  purchasedRedirect = this.props.purchased ?  <Redirect to="/"/> : null

    summary =(

    <div>
    {purchasedRedirect}
    <CheckOutSummary 
    ingredients={this.props.ings}
    checkoutCancelled={this.checkoutCancelledHandler}
    checkoutContinued = {this.checkoutContinuedHandler}/>

    <Route path={this.props.match.path+ '/contact-data'}//Raouting to the contact form
    component={ContactData} />
    </div>

    );
        
    }

    //returning either the route or the elements
    return summary;

    
}
}


//combined reducers
const mapStateToProps = state =>{
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased

        
    }
}



export default connect(mapStateToProps)(Checkout);