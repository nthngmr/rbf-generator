import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

class Spinner extends Component {

  render() {
    let spinnerFile = 'spinner.svg';
    if (this.props.invert) {
      spinnerFile = 'spinner-inverse.svg';
    }
    let spinnerImg = <img className="spinner" src={`${process.env.PUBLIC_URL}/${spinnerFile}`} alt="loading..."/>;

    let text = (
      <Row className='mb-4 mx-0'>
        <Col md={{size: 4, offset: 0}}>
          <h5 className="text-center" style={{color: this.props.invert==='true' ? 'white' : 'black'}}>{this.props.text}</h5>
        </Col>
      </Row>
    )

    if (this.props.useLayout==='true') {
      return (
        <div className={this.props.className}>
          { this.props.text && text }
          <Row className='mb-4 mx-0 text-center justify-content-md-center'>
            <Col md={{size: 4, offset: 0}}>
              {spinnerImg}
            </Col>
          </Row>
        </div>
      );
    } else {
      return <div className={this.props.className}>{spinnerImg}</div>;
    }
  }
}

export default Spinner;
