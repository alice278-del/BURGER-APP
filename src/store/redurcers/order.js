import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased:false
};


const purchaseInit = (state,action) =>{
    return updateObject(state,{purchased:false});
}

//once the user clicked on the order now button to start the purchase and set the loading to true while waiting
const purchaseBurgerStart = (state,action) =>{
    return updateObject(state,{loading:true});
}

//recieves the old state and action and concats the newOrder Object to the array
const purchaseBurgerSuccess = (state,action) =>{

    const newOrder =  updateObject(action.orderData,{
        id: action.orderId
    });
    return updateObject(state,{
        loading:false,
        purchased:true,
        orders: state.orders.concat(newOrder)
    });
}

const purchaseBurgerFail = (state,action) =>{
    return updateObject(state,{loading:false});
};

//initial request from the server will set the loading to true and show the spinner
const fetchOrdersStart=(state,action) =>{
    return updateObject(state,{loading:true});
};
//fetching the order successfully from the server and setting the loading to false actions order is an array
const fetchOdersSuccess = (state,action) =>{
    return updateObject(state,{
        orders:action.orders,
        loading:false
    });
};

//fetching the order failed and setting the loading to false
const fetchOrdersFail = (state,action) =>{
    return updateObject(state,{loading:false});
}



const reducer = (state = initialState,action) =>{

switch(action.type){

    case actionTypes.PURCHASE_INIT: return purchaseInit(state,action);

    case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state,action);

    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state,action);

    case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state,action);

    case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state,action);

    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOdersSuccess(state,action);

    case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state,action);
        
    default: return state;
}
};



export default reducer;