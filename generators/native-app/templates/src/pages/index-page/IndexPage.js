import React, { Component } from 'react';
import { Container, Content, Header, StyleProvider, Text } from 'native-base';

class IndexPage extends Component {

  render() {

    return (
      <Container>
        <Header /> 
        <Content>
          <Text>Welcome to</Text>
          <Text>Testapp</Text>
        </Content>
      </Container>
    );
  }
}
export default IndexPage;