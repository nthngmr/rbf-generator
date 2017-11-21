import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './IndexPage.css';

class IndexPage extends Component {

  render() {

    let gettingStarted = (
      <Row className="getting-started">
        <Col>
          <Row>
            <Col style={{marginBottom: '50px', marginTop: '100px'}}>
              <h5>Welcome to</h5> 
              <h2><%= appname %></h2>
            </Col>
          </Row>
          <Row>
            <Col style={{marginBottom: '50px'}}>
              Add instructions here
            </Col>
          </Row>
        </Col>
      </Row>
    )

    return (
      <Container className="IndexPage">
        <Row>
          <Col sm="12" md={{ size: 12 }}>
            {gettingStarted}
          </Col>
        </Row>
      </Container>
    );
  }
}
export default IndexPage;