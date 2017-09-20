import React, { Component } from 'react';
import { withRouter } from 'react-router';

class ScrollToTop extends Component {
  componentDidMount() {
    
    // this.props.router.listen(location => {
    //   window.scrollTo(0, 0);
    //   document.querySelector(".main-container").scrollTop = 0;
    // });
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

export default withRouter(ScrollToTop);