import React, { Component, Fragment } from "react";
import styles from "./CardComponent.module.css";

class CardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContent: true,
      showInfo: false,
      showAddress: false,
    };
  }
    //toggles som sätter true/false beroende på föregående värde.
  showAddressToggle = () => {
    !this.state.showAddress
      ? this.setState({ showAddress: true })
      : this.setState({ showAddress: false });
  };

  showInfo = () => {
    !this.state.showInfo
      ? this.setState({ showInfo: true })
      : this.setState({ showInfo: false });
  };

  toggleShowContent = () => {
    !this.state.showContent
    ? this.setState({ showContent: true })
    : this.setState({ showContent: false });
  };


  // returnerar props.children.
  // samt info och useraddress beroende på om boolsen här ovanför är true/falsee
  render() {
    return (
      <div className={styles.cardWrapper}>
      {this.props.children}
      {this.state.showInfo &&
      this.props.info}
      {this.state.showAddress &&
      this.props.userAddress}

      {this.props.info &&
        <Fragment>
        <button
          type="button"
          className="btn btn-danger btn-block"
          onClick={this.showInfo}
        >
          {this.state.showInfo ? "Hide info" : "Show info"}
        </button>
        </Fragment>
      }

      {this.props.userAddress &&
        <Fragment>
        <button
          type="button"
          className={this.state.showAddress ? "btn btn-danger btn-block" : "btn btn-success btn-block"}
          onClick={this.showAddressToggle}
        >
          {this.state.showAddress ? "Hide address" : "Show Address"}
        </button>
        </Fragment>
      }
      </div>
    );
  }
}

export default CardComponent;