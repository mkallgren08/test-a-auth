import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import DeleteBtn from "../../components/DeleteBtn";
import { Button, Glyphicon, Navbar } from "react-bootstrap";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import Nav2 from "../../components/Nav2";
//import { Input, TextArea, FormBtn } from "../../components/Form";

class MainPage extends Component {
  //==============================================================
  //==============================================================
  // Component Mounting Functions
  //==============================================================

  // This creates the keystroke-logger function which lets the user select letters
  // document.addEventListener(
  //   "keydown",
  //   this._handleKeyDown.bind(this)
  // )
  constructor(props) {

    super(props);

    const { isAuthenticated } = this.props.auth;

    this.state = {
      names: [],
      firstName: "",
      profile: {},
      authorized: isAuthenticated()
    }
  }

  // Initial load of saved articles
  componentDidMount() {
    if (this.state.authorized) {
      console.log(this.props.auth);
      const { userProfile, getProfile } = this.props.auth;
      if (!userProfile) {
        getProfile((err, profile) => {
          this.setState({ profile });
        });
      } else {
        this.setState({ profile: userProfile });
      }

      this.loadTestData();
    }



  };

  // code to get biodiversity list
  loadTestData = () => {

    API.getUserData()
      .then(
        res => {
          console.log("test data: " + JSON.stringify(res.data, null, 2))
          console.log("First name in list: " + res.data[0]["name"])
          this.setState({
            names: res.data,
            firstName: res.data[0]["name"]
          })
          console.log("names state: " + JSON.stringify(this.state.names, null, 2))
        })
      // console.log(res.data.response.docs);
      .catch(err => console.log(err));
  };

  // This is a leftover from my template file but would like to leave it here in case I add 
  // an entry form for feedback in the future

  // handle form input
  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    this.readUserInput(event)
  };

  // This is the function that renders the page in the client's window.
  render() {
    const { isAuthenticated } = this.props.auth;
    const profile = this.state.profile

    return (
      <Container fluid>
        <Row>
          <Nav2 auth={this.props.auth} />
        </Row>
        <Row>
          <Jumbotron>
            {
              !isAuthenticated() && (
                <div>
                  <h1>Hello - Please Log In To Get Started. </h1>
                  {/* <h3>If this the first time opening the app, please createa  new application in Auth0 and make sure that the client id and domain are properly set in the auth0-variables.js file and that the callback URLs are allowed in Auth0</h3> */}
                </div>

              )
            }
            {
              isAuthenticated() && (
                <h1>Hello {profile.given_name}: Time to Get Coding!!</h1>

              )
            }
          </Jumbotron>
        </Row>
        {
          !isAuthenticated() && (
            <Row>
              <Container>
                <h3>If this the first time opening the app, please create a  new application in Auth0 and make sure that the client id and domain are properly set in the auth0-variables.js file and that the callback URLs are allowed in Auth0</h3>
              </Container>
            </Row>
          )
        }

      </Container >
    );
  }
}

export default MainPage;
