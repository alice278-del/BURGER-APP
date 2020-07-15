import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHnadler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';



class Orders extends Component{
    
//once the component did mount so once the user clicked on the orders component  it will dispatch onFetchOrder
    componentDidMount(){
        this.props.onFetchOrder(this.props.token,this.props.userId);
    }

render(){

    let orders = <Spinner/>;
    
//if the loading state from redux is false show the orders
    if(!this.props.loading){

        orders =(

            this.props.orders.map(order =>(
                <Order 
                key ={order.id}
                ingredients ={order.ingredients}
                price ={order.price}/>
            ))

        );
    }
    return(
<div>
   {orders}
</div>
    );
}
}


//combined reducers
const mapStateToProps = state =>{
    return{
        orders: state.order.orders,
        laoding: state.order.loading,
        token:state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrder:(token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHnadler(Orders,axios));