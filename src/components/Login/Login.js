import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../Input/Input';

const handleEmail = (state, action) => {
  if (action.type === 'EMAIL_INPUT') {
    return ({value: action.value, isValid: action.value.includes('@')});
  } else if (action.type === 'EMAIL_BLUR') {
    return ({value: state.value, isValid: state.isValid});
  }
  return {value: '', isValid: false};
}

const handlePassword = (state, action) => {
  if (action.type === 'PASSWORD_INPUT') {
    return ({value: action.value, isValid: action.value.trim().length > 6})
  } else if (action.type === 'PASSWORD_BLUR') {
    return ({value: state.value, isValid: state.isValid});
  }
  return ({value: '', isValid: null});
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(handleEmail, {value: '', isValid: null});
  const [passwordState, dispatchPassword] = useReducer(handlePassword, {value: '', isValid: null});
  const context = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const formValidTimer = setTimeout(() => {
      console.log('this is hit');
      setFormIsValid(
        passwordState.isValid && emailState.isValid
      );
    }, 500);
    return () => {
      clearTimeout(formValidTimer);
    }
  }, [passwordState.value, emailState.value])  

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'EMAIL_INPUT', value: event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: "PASSWORD_INPUT", value: event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'EMAIL_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'PASSWORD_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid){
      context.login(emailState.value, passwordState.value);
    } else if (!emailState.isValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input ref={emailInputRef} isValid={emailState.isValid} htmlfor='email' label='E-Mail' type='email' id='email' value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler}/>
        <Input ref={passwordInputRef} isValid={passwordState.isValid} htmlfor='password' label='Password' type='password' id='password' value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler}/>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
