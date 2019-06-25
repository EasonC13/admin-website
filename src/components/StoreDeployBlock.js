import React, { Component } from "react";
import PropTypes from "prop-types";
import HashColor from "./UI/HashColor";
import Input from "./UI/Input";
import { OrangeButton } from "./UI/Button";
import { isEmpty } from "../components/utils";

class StoreDeployBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issuerName: "",
      issuerNameIsValid: true
    };
    this.onNameChange = this.onNameChange.bind(this);
  }

  onNameChange(event) {
    this.setState({
      issuerName: event.target.value,
      issuerIsValid: isEmpty(event.target.value)
    });
  }

  render() {
    const inputMessage = this.state.issuerIsValid
      ? "Issuer Name cannot be empty."
      : "";

    const onDeployClick = () => {
      const { adminAddress, handleStoreDeploy } = this.props;
      const { issuerName, issuerNameIsValid } = this.state;
      if (!isEmpty(issuerName) && issuerNameIsValid) {
        handleStoreDeploy({
          fromAddress: adminAddress,
          name: issuerName
        });
      } else {
        this.setState({
          issuerIsValid: isEmpty(issuerName)
        });
      }
    };

    return (
      <div className="w-100">
        <div className="mb4">
          <div>
            Issuer Name
            <br />
            <Input
              className="mt2"
              variant="pill"
              type="text"
              placeholder="Name of organization"
              onChange={this.onNameChange}
              value={this.state.issuerName}
              message={inputMessage}
              size={50}
              required
            />
          </div>
        </div>

        <OrangeButton
          variant="pill"
          onClick={onDeployClick}
          disabled={this.props.deploying}
        >
          {this.props.deploying ? "Deploying…" : "Deploy"}
        </OrangeButton>

        {this.props.deployedTx ? (
          <div className="mt5">
            <div>
              🎉 New store deployed at
              <HashColor hashee={this.props.storeAddress} type="address" />
            </div>
            <div className="mt2">
              Transaction ID
              <HashColor
                hashee={this.props.deployedTx}
                isTx
                networkId={this.props.networkId}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default StoreDeployBlock;

StoreDeployBlock.propTypes = {
  adminAddress: PropTypes.string,
  storeAddress: PropTypes.string,
  deploying: PropTypes.bool,
  deployedTx: PropTypes.string,
  networkId: PropTypes.number,
  loadAdminAddress: PropTypes.func,
  handleStoreDeploy: PropTypes.func
};
