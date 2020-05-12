import React, { Component } from "react";
import { withRouter } from "react-router";

class LoginScreen extends Component {
  navigate = () => {
    this.props.history.push("/user");
    this.props.logIn();
  };

  render() {
    if (this.props.loggedOn) {
      return (
        <div>
          <p>You are already logged in!</p>
          <button
            type="button"
            className="btn btn-danger btn-block"
            onClick={this.props.logOut}
          >
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="input-group-text"
                placeholder="Username"
              ></input>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={this.navigate}
            >
              Login
            </button>
          </form>
        </div>
      );
    }
  }
}

export default withRouter(LoginScreen);
