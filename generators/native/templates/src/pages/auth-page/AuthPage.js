import React, { Component } from 'react';
import NMAuthComponent from '@nothingmore/auth/native/NMAuthComponent';
import { Container, Content } from 'native-base';

class AuthPage extends Component {

  render() {

    return (
      <Container>
        <Content padder>
          <NMAuthComponent/>
        </Content>
      </Container>
    )
  }
}

export default AuthPage;
