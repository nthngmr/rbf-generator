import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import SignInForm from './SignInForm';
import './AuthPage.css';

class AuthPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  submit = (values) => {
    // print the form values to the console
    console.log(values)
  }

  handleSignUpLinkClick = (event) => {
    event.preventDefault();
    this.setState({signUp: true})
  }

  handleSignInWithEmail = (event) => {
    event.preventDefault();
    const {email, password} = this.props.form.values;
    this.props.signInWithEmail(email, password);
  }

  handleSignUpWithEmail = (event) => {
    event.preventDefault();
    const {email, password, passwordConfirmation} = this.props.form.values;
    this.props.signUpWithEmail(email, password, passwordConfirmation);
  }

  render() {

    return (
      <Container className="AuthPage">
        <Row className="justify-content-md-center">
          <Col sm="12" md={{ size: 3}}>
            <Row className="logo"><Col><h1 className="<%= appname %>-logo"><%= appname %></h1></Col></Row>
            <Row>
              <Col>
              <SignInForm 
                onSubmit={this.submit} 
                signInWithEmail={this.handleSignInWithEmail}                
                signUpWithEmail={this.state.signUp && this.handleSignUpWithEmail} 
                signInWithGoogle={this.props.signInWithGoogle}
                onSignUp={this.handleSignUpLinkClick}
              />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default AuthPage;