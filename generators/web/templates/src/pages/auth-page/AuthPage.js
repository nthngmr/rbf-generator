import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import NMAuthComponent from '@nothingmore/auth/web/NMAuthComponent';
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
            <Row className="logo"><Col><h1>testapp</h1></Col></Row>
            <Row>
              <Col>
                <NMAuthComponent />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default AuthPage;
