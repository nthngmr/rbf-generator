import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { NMAuthComponent } from '@nothingmore/auth';
import firebase from './../../firebase';
import './AuthPage.css';

class AuthPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    return (
      <Container className="AuthPage">
        <Row className="justify-content-md-center">
          <Col sm="12" md={{ size: 3}}>
            <Row className="logo"><Col><h1><%= appname %></h1></Col></Row>
            <Row>
              <Col>
                <NMAuthComponent firebase={firebase} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default AuthPage;