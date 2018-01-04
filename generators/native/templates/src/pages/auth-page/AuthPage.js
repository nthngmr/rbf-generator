import React, { Component } from 'react';
import SignInForm from './SignInForm';
import { Container, Content } from 'native-base';

class AuthPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
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
      <Container>
        <Content padder>
          <SignInForm 
            onSubmit={this.submit} 
            signInWithEmail={this.handleSignInWithEmail.bind(this)}                
            signUpWithEmail={this.state.signUp && this.handleSignUpWithEmail} 
            signInWithGoogle={this.props.signInWithGoogle}
            onSignUp={this.handleSignUpLinkClick}
          />
        </Content>
      </Container>
    )
  }
}

export default AuthPage;