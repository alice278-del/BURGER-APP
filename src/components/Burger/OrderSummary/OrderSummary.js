import React,{Component} from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';




class OrderSummary extends Component{

    componentWillUpdate(){
        console.log('[OrderSummary] willUpdate');
        
    }



    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)//trtansform into an array of keys
        .map(igkey =>{
            return <li key={igkey}>
                <span style={{textTransform:'capitalize'}}>{igkey}</span>:{this.props.ingredients[igkey]}
    
                </li>//igkey is the ingredient key Salad Meat or whatever and the props.ingredients[igkey] is the number value of the ingredients
        })
        return(
<Aux>
    <h3>Your Order</h3>
    <p>A delicious burger with the following ingredients:</p>
    <ul>
{ingredientSummary}

    </ul>
    <p><strong>Total Price:{this.props.price.toFixed(2)}</strong></p>
    <p>Continue to CheckOut</p>
    <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
    <Button btnType="Success" clicked={this.props.purchaseContiue}>CONTINUE</Button>
</Aux>
);

}
    }



export default OrderSummary;