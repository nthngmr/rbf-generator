import React, { Component } from 'react';
import { Container, Content, Header, StyleProvider, Text, Left, Body, Right, Button, Icon, Title, H1, H2, View } from 'native-base';

class IndexPage extends Component {

  render() {

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title><%= appname %></Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 200
          }}>
            <H2>Welcome to</H2>
            <H1><%= appname %></H1>
          </View>
        </Content>
      </Container>
    );
  }
}
export default IndexPage;