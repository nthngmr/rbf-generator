import React from 'react';
import { Row, Col, Button, Form, FormGroup, Label, ButtonGroup } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

let SigninForm = props => {
  const { 
    handleSubmit, 
    signInWithGoogle, 
    signUpWithEmail, 
    signInWithEmail,
    onSignUp
  } = props;

  const passwordConfirmation = (
    <FormGroup>
      <Label for="passwordConfirmation" hidden>Confirm Password</Label>
      <Field
        component="input"
        type="password"
        name="passwordConfirmation"
        className="form-control form-control-sm"
        id="password"
        placeholder="confirm password"
      />
    </FormGroup>
  )

  const emailSignIn = (
    <Col className="emailSignIn">
      <Form onSubmit={ signUpWithEmail || signInWithEmail }>
        <FormGroup>
          <Label for="email" hidden>Email</Label>
          <Field
            component="input"
            type="email"
            name="email"
            className="form-control form-control-sm"
            id="email"
            placeholder="email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password" hidden>Password</Label>
          <Field
            component="input"
            type="password"
            name="password"
            className="form-control form-control-sm"
            id="password"
            placeholder="password"
          />
        </FormGroup>
        {signUpWithEmail ? passwordConfirmation : ''}
        <Button className="float-right" color="primary" size="sm" type="submit">Submit</Button>
      </Form>
      {signUpWithEmail ? '' : <p className="signUpLink">No Account? <a href="#" onClick={onSignUp}>Click here.</a></p>}
    </Col>
  )

    return (
      <Row>
        {emailSignIn}
        <Col className="socialSignin justify-content-md-center">
          <p className="instructions">Sign in with a social media account</p>   

          <ButtonGroup className="social-signing-buttons">
            <Button size="sm" color="primary" onClick={signInWithGoogle}>Google</Button>{' '}
            <Button size="sm" color="primary" disabled={true}>Facebook</Button>{' '}
            <Button size="sm" color="primary" disabled={true}>Twitter</Button>
          </ButtonGroup>
        </Col>
      </Row>
    );
}

SigninForm = reduxForm({
  // a unique name for the form
  form: 'signIn'
})(SigninForm)

export default SigninForm;
  