import React, {Component} from 'react';
import Aux from'../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import witErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';

import * as burgerBuilderActions from '../../store/actions/index';






class BurgerBuilder extends Component{


    state = {

     purchasing:false,
     
    }


    //FETCHING DATA FROM FIREBASE
    componentDidMount(){
        //will dispatch the action of calling the ingredients from the server see billow and reducer burgerBuilder
    this.props.onInitIngredients();
    }

    updatePuchaseState(ingredients){
    
    const sum = Object.keys(ingredients).map(igKey =>{
      return ingredients[igKey]//returnning the value for each key array of values{1,2,3}
    })
    .reduce((sum,el)=>{
     return sum + el;
    },0);

    return sum>0;//setting the puchaseble to true if bigger than 0

    }

    
    purchaseHandler = () =>{
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});
        }else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
        

    }

    purchasedCancelHandler = () =>{
        this.setState({purchasing:false})
    }

    //clicking on the order now button
    purchaseContiueHandler=()=>{
       //will disaptch the action on the click and set the purchaesd state to true
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
            

    }


    render(){
        const disabledInfo = {
            ...this.props.ings//copiing the Object ingreidients from redux
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0//disabledInfo[key] is the value of each Object 
            
        }
        //{salad:true,meat:false}...
        let  orderSummary = null;
        
        //setting an error message if for any reason the conncetion or the data from thr database was not completed
        let burger = this.props.error?<p>Ingredients can't be loaded!</p> : <Spinner/>;


        //if ingredients from redux is false so their are no ingredients render spinner else render the burger
        if(this.props.ings){
            burger =(
            <Aux>
                {/* the burger component will recieve the state from redux of the ingredients */}
            <Burger ingredients ={this.props.ings}/>
            {/* buildcontrols will recieve props from redux and pass it down to the component */}
            <BuildControls
              ingredientsAdded ={this.props.onIngredientAdded}
              ingredientRemove = {this.props.onIngredientRemoved}
              disabled = {disabledInfo}
              purchaseble={this.updatePuchaseState(this.props.ings)}
              ordered={this.purchaseHandler}
              isAuth ={this.props.isAuthenticated}
              price ={this.props.price}/>

              </Aux>
            );

        orderSummary = <OrderSummary 
        ingredients = {this.props.ings} 
        purchaseCancelled={this.purchasedCancelHandler}
        price={this.props.price}
        purchaseContiue={this.purchaseContiueHandler}/>;
        }

       
        
        

        
        return(

            <Aux>
               <Modal show={this.state.purchasing} modalClosed={this.purchasedCancelHandler}> 
                  {orderSummary}
               </Modal>
               {burger}
                

            </Aux>
        );
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}
const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (ingName)=> dispatch (burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=> dispatch (burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients:() => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(witErrorHandler(BurgerBuilder,axios));