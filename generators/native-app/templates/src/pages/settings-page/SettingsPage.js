import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './SettingsPage.css';

class SettingsPage extends Component {

  render() {
    return (
      <Container className="SettingsPage">
        <Row>
          <Col sm="12" md={{ size: 6 }}>
            <Row className="section">
              <Col>
                <h5 className="title">My Settings</h5>
                <p> (add settings here)</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default SettingsPage;