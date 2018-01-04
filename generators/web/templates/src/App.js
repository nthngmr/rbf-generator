import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import ScrollToTop from './components/ScrollToTop';
import Spinner from './components/Spinner';
import MainNav from './components/MainNav';
import { Container } from 'reactstrap';
import { withRouter, Redirect } from 'react-router';
import { BASEURL } from './constants';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import IndexPageContainer from './pages/index-page/IndexPageContainer';
import SettingsPageContainer from './pages/settings-page/SettingsPageContainer';
import AuthPageContainer from './pages/auth-page/AuthPageContainer';


class App extends Component {

  render() {


    switch (this.props.authStatus) {
      case 'pending': 
        return <Container fluid className="no-gutters main-container"><Spinner useLayout="true"/></Container>
      case 'unauthenticated':
        return (
          <Container fluid className="no-gutters main-container">
            {this.props.location.pathname === '/auth' ? '' : <Redirect to={`${BASEURL}/auth`} /> }
            <Route path={`${BASEURL}/auth`} component={AuthPageContainer} />
          </Container>
        )
      case 'authenticated':
        return (
          <ScrollToTop>
            <Container fluid className="no-gutters main-container">
              <MainNav/>
              { this.props.location.pathname === '/auth' ? <Redirect to={`${BASEURL}/`} /> : '' }
              <Route exact path={`${BASEURL}/`} component={IndexPageContainer} />
              <Route path={`${BASEURL}/settings`} component={SettingsPageContainer} />
            </Container>
          </ScrollToTop>
        );
      default: 
        return '';
    }

    
  }

}

const mapStateToProps = (state) => {
  return {
    authStatus: state.auth.status
  }
}
export default withRouter(connect(mapStateToProps)(App));
