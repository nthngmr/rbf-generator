import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { connectStyle, Button, Text, Form, Input, Item, Label } from 'native-base';

let renderInput = ({ input, inputProps, label, last, type, meta: { touched, error, warning } }) => {
  var hasError= false;
  if(error !== undefined){
    hasError= true;
  }
  return( 
    <Item floatingLabel error={hasError}>
      <Label>{label}</Label>
      <Input {...input} {...inputProps} />
      {hasError ? <Text>{error}</Text> : (null)}
    </Item>
  )
}

const validate = values => {
  const error= {};
  error.email= '';
  error.password= '';
  var ema = values.email;
  var nm = values.password;
  if(values.email === undefined){
    ema = '';
  }
  if(values.password === undefined){
    nm = '';
  }
  if(!ema.includes('@') && ema !== ''){
    error.email= '@ not included';
  }

  return error;
};


let SigninForm = props => {
  const { 
    handleSubmit, 
    signInWithGoogle, 
    signUpWithEmail, 
    signInWithEmail,
    onSignUp
  } = props;


  return (
    <Form style={styles.container}>
      <Field name="email" label="Email" inputProps={{keyboardType: 'email-address', autoCapitalize: 'none'}} component={renderInput} />
      <Field name="password" last="true" label="Password" inputProps={{secureTextEntry: true, autoCapitalize: 'none'}} component={renderInput} />
      <Button style={{marginTop: 40, marginBottom: 40}} block primary onPress={signInWithEmail}>
        <Text>Submit</Text>
      </Button>
      {signUpWithEmail ? <Text></Text> : <Text onPress={onSignUp} className="signUpLink">No Account? Tap here.</Text>}
    </Form>
  )
}

const styles = {
  container: {
    backgroundColor: 'white',
    paddingTop: 100
  }
};


export default connectStyle('yourTheme.CustomComponent', styles)(reduxForm({form: 'signIn', validate})(SigninForm));