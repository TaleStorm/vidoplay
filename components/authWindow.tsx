import React, { Component } from "react";
import Authorization from '../components/authorization'
import Registration from '../components/registration'
import ForgottenPass from '../components/forgottenPass'

import { AuthWindowData } from '../interfaces'

type AuthWindowProps = AuthWindowData

export default class AuthWindow extends Component<AuthWindowProps>  {
  constructor(props: AuthWindowProps) {
    super(props);
  }

  componentDidMount() {

  }

  public render(): React.ReactElement<AuthWindowProps> {
    if (this.props.stage == "auth") {
      return (
        <Authorization 
          hidden={this.props.hidden} 
          hideFunc={this.props.hideFunc} 
          forPassFunc={this.props.forPassFunc}
          regFunc={this.props.regFunc}
        />
      );
    } else if (this.props.stage == "reg") {
      return (
        <Registration 
          hidden={this.props.hidden} 
          hideFunc={this.props.hideFunc}
          authFunc={this.props.authFunc}
        />
      );
    } else if (this.props.stage == "passChange") {
      return (
        <ForgottenPass hidden={this.props.hidden} hideFunc={this.props.hideFunc}/>
      );
    }
  }
}