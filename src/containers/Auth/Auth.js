import React ,{Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject,checkValidity} from '../../shared/utility';




class Auth extends Component{

    state = {
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value:'',
                validation:{
                required:true,
                isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type: 'password',
                    placeholder: 'Password'
                },
                value:'',
                validation:{
                required:true,
                minLength: 6
                },
                valid:false,
                touched:false
            }
        },
        isSignup:true
    }


    componentDidMount(){
        //checking if
  if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
      
  }
    }

   


    inputChangedHnadler = (event,controlName) =>{
        const updatedControls = updateObject(this.state.controls,{
            [controlName]: updateObject(this.state.controls[controlName],{
                value: event.target.value,
                valid:checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }) 
        });
        this.setState({controls: updatedControls});
    }

    submitHandler =(event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
    }


    //checking once button was clicked if sign in or sign up toggler
    switchAuthModeHandler = () =>{
        this.setState(prevState =>{
            return {isSignup: !prevState.isSignup};
        })
    }

    render(){

        const formElementArray =[];
        for(let key in this.state.controls){
            formElementArray.push({
                id:key,
                config:this.state.controls[key]
            });
        }

        let form = formElementArray.map(formElement =>(
            <Input key ={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig = {formElement.config.elementConfig}
            invalid={!formElement.config.valid}
            shouldValidate ={formElement.config.validation}
            touched = {formElement.config.touched}
            value ={formElement.config.value} changed={(event)=>this.inputChangedHnadler(event,formElement.id)}/>
            

        ));

        //ADDING TH SPINNER IF LOADING IS TRUE FROM THE COMBINED STATE
        if (this.props.loading) {
            form = <Spinner/>
        }


        //handling the error message
        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
             <p>{this.props.error.message}</p>
            );
        }

        //
        let authRedirect = null;
        if(this.props.isAuthenticated){
          authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return(
            

            <div className={classes.Auth}>
                {authRedirect}
                 {errorMessage}
                <form onSubmit ={this.submitHandler}>
                 {form}
                <Button btnType="Success">Submit</Button>
                </form>

                <Button 
                clicked = {this.switchAuthModeHandler}
                btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        );
    }




}

const mapStateToProps = state =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchTopProps = dispatch =>{
    return{
        onAuth: (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};


export default connect(mapStateToProps,mapDispatchTopProps)(Auth);