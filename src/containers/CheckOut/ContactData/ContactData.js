import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject, checkValidity} from '../../../shared/utility';



class ContactData extends Component{
state = {
    orderForm: {
           name:{
               elementType:'input',
               elementConfig:{
                   type: 'text',
                   placeholder: 'Your Name'
               },
               value:'',
               validation:{
               required:true
               },
               valid:false,
               touched:false
           },
            street:{
                elementType:'input',
               elementConfig:{
                   type: 'text',
                   placeholder: 'Street'
            },
              value:'',
              validation:{
                required:true
                },
                valid:false,
                touched:false
        },
        zipCode:{
            elementType:'input',
           elementConfig:{
               type: 'text',
               placeholder: 'Zip code'
        },
          value:'',
          validation:{
            required:true,
            minLength:5,
            maxLength:5,
            },
            valid:false,
            touched:false
        },
        Country:{
            elementType:'input',
           elementConfig:{
               type: 'text',
               placeholder: 'Country'
        },
          value:'',
          validation:{
            required:true
            },
            valid:false,
            touched:false
        },
        email:{
            elementType:'input',
           elementConfig:{
               type: 'email',
               placeholder: 'E-mail'
        },
          value:'',
          validation:{
            required:true
            },
            valid:false,
            touched:false
        },

        deliveryMethod:{
            elementType:'select',
           elementConfig:{
              options:
              [{
                  value: 'fastest',
                  displayValue:'Fastest'},

              {value: 'cheapest',
              displayValue:'Cheapest'}]
        },
          value:'fastest',
          validation:{},
          valid:true
        },
            
           
    },
    formIsValid:false,
    
}





orderHnadler = (event) =>{


    event.preventDefault();


 //alert('You continue');
        

      const formData={};
        for( let formElementIdentifier in this.state.orderForm){//email, coutry so on
            //this will store the data in a new Object with the keys and values in the fromData{}
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        
        //order Object ingredients and price from the redux state and the formData fron the UI state component
        const order = {
            ingredients: this.props.ings,
            price:this.props.price,
            orderDate: formData,
            userId:this.props.userId
            
        }

        //dispatching onOrderBurger on the bottom of the page
        this.props.onOrderBurger(order,this.props.token);
       

}


inputChangedHnadler = (event,inputIdentifier) =>{


const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],{

    value:event.target.value,
    valid:checkValidity(event.target.value,this.state.orderForm[inputIdentifier].validation),//true or false
    touched:true
}) 

const  updatedOrderForm = updateObject(this.state.orderForm,{
    [inputIdentifier]: updatedFormElement
})
   
   



let formIsValid = true;
for(let inputIdetifier in updatedOrderForm){
    formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;//access the propery
}

this.setState({orderForm:updatedOrderForm,formIsValid :formIsValid});

}

render(){
    const formElementArray =[];
    for(let key in this.state.orderForm){
        formElementArray.push({
            id:key,
            config:this.state.orderForm[key]
        });
    }

    let form = (
    <form onSubmit={this.orderHnadler}>
        
        {formElementArray.map(formElement =>(
            <Input 
            key ={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig = {formElement.config.elementConfig}
            invalid={!formElement.config.valid}
            shouldValidate ={formElement.config.validation}
            touched = {formElement.config.touched}
            value ={formElement.config.value} changed={(event)=>this.inputChangedHnadler(event,formElement.id)}/>
            
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}> ORDER</Button>
        
    </form>);

//fetching the loading state from redux with props
    if (this.props.loading) {
        form =<Spinner/>
    }
    return(
        <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form}
        </div>
    );
}
}

//combined reducers from redux burgerBuilder order and auth
const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId

    }
};

const mapDispatchToProps = dispatch =>{
    return{
    onOrderBurger: (orderDate,token) => dispatch(actions.purchaseBurger(orderDate,token))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
