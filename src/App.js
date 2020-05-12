import React, { Component } from "react";
import CardComponent from "./components/CardComponent";
import UserComponent from "./components/UserComponent";
import NavbarComponent from "./components/NavbarComponent";
import LoginScreen from "./screens/LoginScreen";
import UserScreen from "./screens/UserScreen";

import { Switch, Route } from "react-router-dom";

import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      color: "white",
      user: [{name: ''}],
      loggedOn: false,
    };
  }
  componentDidMount(){
    fetch(`http://api.softhouse.rocks/users/`)
    .then((response) => {
      return response.json()
    })
    .then((users) => {
      users = users.slice(0,10)
      this.setState({users})
    });
  }

  // Genererar en random hex färg och ändrar color-state till den.
  toggleColor = () => {
    this.setState({
      color: "#" + Math.floor(Math.random() * 16777215).toString(16)
    });
  };


  // Skapar en array (userList) genom att konkatenera users-array med user-array. Därefter lägger vi innehållet
  // i users genom setState, därefter tömmer vi user-array igen.
  addUser = () => {
    let usersList = this.state.users.concat(this.state.user);
    this.setState({
      users: usersList
    });
    this.setState({
      user: {name: ''}
    });
  };

  //Tar bort den sista usern i vår array och sätter state därefter.
  removeUser = () => {
    this.state.users.pop();
    this.setState({
      users: this.state.users
    });
  };

  //Körs onChange i inputbox och tar emot och sätter vår user-array enligt value.
  user = event => {
    let userObj = {name: event.target.value}
    this.setState({user:userObj});
  };

  logIn = () => {
    this.setState({ loggedOn: true });
  };
  logOut = () => {
    this.setState({ loggedOn: false });
  };

  //Renderar våra komponenter och skickar med de props som behövs.
  render() {
    return (
      <div>
        <NavbarComponent />
        <div
          className="wrapper"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <Switch>
            <Route exact path="/">
              <div>
                <CardComponent>
                  <UserComponent
                    users={this.state.users}
                    color={this.state.color}
                    test={this.state.test}
                  ></UserComponent>
                  <button
                    type="button"
                    className="btn btn-info btn-block"
                    onClick={this.toggleColor}
                  >
                    Toggle Color
                  </button>
                </CardComponent>
              </div>
              <div>
                <CardComponent>
                  <form>
                    <div className="form-group">
                      <input
                        type="text"
                        className="input-group-text"
                        placeholder="New user..."
                        value={this.state.user.name || ''}
                        onChange={this.user}
                      ></input>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      onClick={this.addUser}
                    >
                      add
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-block"
                      onClick={this.removeUser}
                    >
                      Delete
                    </button>
                  </form>
                </CardComponent>
              </div>
            </Route>
            <Route exact path="/login">
              <CardComponent info="You need to login">
                <LoginScreen
                  logIn={this.logIn}
                  logOut={this.logOut}
                  loggedOn={this.state.loggedOn}
                />
              </CardComponent>
            </Route>

            <Route
              exact
              path="/user"
              render={props => (
                <CardComponent>
                  <UserScreen {...props} />
                </CardComponent>
              )}
            />
            <Route
              exact
              path="/user/:userid"
              render={props => (
                <CardComponent>
                  <UserScreen {...props} />
                </CardComponent>
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
