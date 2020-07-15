import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


//if the burger was succsefully purchased to the server
export const purchaseBurgerSuccess = (id,orderData) =>{
    return {
     type: actionTypes.PURCHASE_BURGER_SUCCESS,
     orderId: id,
     orderData: orderData
    };
};


//purchase failed to store to the server
export const purchaseBurgerFail =(error) =>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    };
}

//action dispatched once user clicked on the button order
export const purchaseBurgerStart = () =>{
    return{
        type: actionTypes.PURCHASE_BURGER_START
    }
}


//intial purchase state
export const purchaseBurger = (orderData,token) =>{
    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token,orderData)
        .then(response =>{
           
           //once the response was succesfully posted on the server it is dispatched to the function
            dispatch(purchaseBurgerSuccess(response.data.name,orderData));
            
            
        }).catch(error =>{
            
            dispatch(purchaseBurgerFail(error));
            
        });
    };
};

export const purchaseInit = () =>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) =>{
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    };
};


export const fetchOrderFail = (error) =>{
    return{
   type: actionTypes.FETCH_ORDERS_FAIL,
   error:error
    }
    
}

export const fetthOrdersStart = () =>{
    return{
        type:actionTypes.FETCH_ORDERS_START,

    };
};


//fetching the orders from the server
export const fetchOrders = (token,userId)=>{
    return dispatch =>{
        //initial steps to fetching the data will dispatch the function
        dispatch(fetthOrdersStart());
        //fetching orders using query params to serach for a specific Id to fetch the order
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
     .then(res => {
         const fetchOrders =[];
         for(let key in res.data){//the key in Firebase for each order
         fetchOrders.push({
             ...res.data[key],//this is the actuall order details
             id:key
         });
         }
         console.log('fetchOrders =>' ,fetchOrders);
         
         //dispatching success
         dispatch(fetchOrdersSuccess(fetchOrders));
         
         
     })
     .catch(err =>{
         dispatch(fetchOrderFail(err));
     
    });
};
};