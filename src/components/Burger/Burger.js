import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngridient/BurgerIngridient';



const burger = (props) =>{

    //transforming an Object into an array of strings keys (Object.keys) [bacon,cheese,salad]
    let transformedIngredients = Object.keys(props.ingredients)//array of the keys in the Object[salad,bacon,cheese] values not part of the array
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) =>{//Array of the amount of the given ingredient...igKey will be the type of the ingredient so now the array will contain 2 elements [,,]
            return <BurgerIngredient key={igKey + i} type ={igKey}/>//returning a component
    });
  
  
})
.reduce((arr,el)=>{
    return arr.concat(el)//initial value contains[] and concat the given element and added to th given array
},[]);


//checking if the array from redux state is 0 ingredients
if (transformedIngredients.length ===0) {
    transformedIngredients = <p>Please start adding ingredients</p>
    
}




//burger starting with the bread top bottom
return(

<div className={classes.Burger}>
    
<BurgerIngredient type="bread-top"/>
{transformedIngredients}
<BurgerIngredient type="bread-bottom"/>


</div>
);
};


export default burger;