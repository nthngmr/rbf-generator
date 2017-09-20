import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './IndexPage.css';

class IndexPage extends Component {

  render() {

    let gettingStarted = (
      <Row className="getting-started">
        <Col md={{size: 8, offset: 2}}>
          <Row>
            <Col style={{marginBottom: '50px', marginTop: '100px'}}>
              <h3>Getting Started with <font className="main-logo"><%= appname %></font></h3>
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
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            {gettingStarted}
          </Col>
        </Row>
      </Container>
    );
  }
}
export default IndexPage;