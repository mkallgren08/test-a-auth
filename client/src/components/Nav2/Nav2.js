import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import Callback from '../../Callback/Callback.js';
import history from '../../history.js';
import Auth from '../../Auth/Auth.js';
// import Auth from './Auth/Auth.js';
import { Col, Container, Row } from "../Grid"



// const auth = new Auth();
// auth.login();

//const history = require('history')

const auth = new Auth();


class Nav2 extends Component {

  constructor(props){
    super(props);
    this.state = {
      profile: {}
    }
  }

  componentDidMount() {
    const { userProfile, getProfile, isAuthenticated } = this.props.auth;
    if (isAuthenticated()) {
      if (!userProfile) {
        getProfile((err, profile) => {
          this.setState({ profile });
          console.log('user profile: ' + JSON.stringify(this.state.profile, 2, null));
        });
      } else {
        this.setState({ profile: userProfile });
      }
    }
  }



  goTo(route) {
    //this.props.history.replace(`/${route}`)
    history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const profile = this.state.profile

    return (
      <Container fluid>
        <Navbar fluid>
          <Row>
            <Col size="md-4">
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="#">Auth0 - React</a>
                </Navbar.Brand>
                <Button
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.goTo.bind(this, 'home')}
                >
                  Home
            </Button>
                {
                  isAuthenticated() && (
                    <Button
                      bsStyle="primary"
                      className="btn-margin"
                      onClick={this.goTo.bind(this, 'profile')}
                    >
                      Profile
                  </Button>
                  )
                }
                {
                  !isAuthenticated() && (
                    <Button
                      id="qsLoginBtn"
                      bsStyle="primary"
                      className="btn-margin"
                      onClick={this.login.bind(this)}
                    >
                      Log In
                  </Button>
                  )
                }
                {
                  isAuthenticated() && (
                    <Button
                      id="qsLogoutBtn"
                      bsStyle="primary"
                      className="btn-margin"
                      onClick={this.logout.bind(this)}
                    >
                      Log Out
                  </Button>
                  )
                }
              </Navbar.Header>
            </Col>
            <Col size="md-8">
              {
                isAuthenticated() && (
                  <h1>Welcome {profile.given_name}</h1>
                )
              }
            </Col>
          </Row>
        </Navbar>
      </Container>
    );
  }
}

export default Nav2;
