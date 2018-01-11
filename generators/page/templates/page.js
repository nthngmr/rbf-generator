import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import _ from 'lodash';
import './<%= page %>Page.css';

class <%= page %>Page extends Component {

  render() {

    return (
      <Container className="<%= page %>Page">
        <Row>
          <Col sm="12" md={{ size: 12 }}>
            <%= page %>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default <%= page %>Page;