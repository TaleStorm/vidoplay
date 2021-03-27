import AuthWindow from '../components/authWindow'
import React, { Component } from "react";

import {HeaderData } from '../interfaces'

type HeaderProps = HeaderData

export default class Header extends Component<HeaderProps, {auth:boolean}>  {
  constructor(props: HeaderProps) {
    super(props);
    this.openAuth = this.openAuth.bind(this);
    this.closeAuth = this.closeAuth.bind(this);
    this.state = {
      auth: false
    }
  }

  public openAuth = () => {
      this.setState({
        auth: true
      })
  };

  public closeAuth = () => {
    this.setState({
      auth: false
    })
};

  componentDidMount() {
  }

  public render(): React.ReactElement<HeaderProps> {
    return (
    <header className="relative">
      <div className="max-w-7xl mx-auto" >
        <div className="flex justify-between items-center py-6 md:space-x-10">
              <div className="flex justify-between items-center py-6 md:space-x-10">

                <div className="flex justify-center ">
                  <a href="#">
                    <span className="sr-only">Logo</span>
                    <img className="h-20 w-auto" src="/images/logo.png" alt="" />
                  </a>
                </div>
                
                <nav className="flex justify-self-start space-x-8 font-roboto font-normal text-sm">
                  <a href="#" className=" text-sm text-base text-black-500 hover:text-gray-900">
                    Лента
                  </a>
                  <a href="#" className=" text-sm text-base text-black-500 hover:text-gray-900">
                    Каталог
                  </a>
                  <a href="#" className=" text-sm text-base text-black-500 hover:text-gray-900">
                    Подборки
                  </a>
                </nav>
              </div>
              <nav className="flex justify-end">
                <a href="#" className="text-sm text-base text-black-500 hover:text-gray-900 ml-5">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.9545 3.75C11.134 3.75 9.35443 4.28983 7.84075 5.30124C6.32708 6.31264 5.14732 7.75018 4.45065 9.43209C3.75399 11.114 3.57171 12.9647 3.92687 14.7502C4.28202 16.5357 5.15867 18.1758 6.44594 19.4631C7.73321 20.7503 9.37329 21.627 11.1588 21.9821C12.9443 22.3373 14.795 22.155 16.4769 21.4583C18.1588 20.7617 19.5964 19.5819 20.6078 18.0682C21.6192 16.5546 22.159 14.775 22.159 12.9545C22.1588 10.5134 21.189 8.17225 19.4629 6.44611C17.7367 4.71996 15.3956 3.75016 12.9545 3.75V3.75Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
                    <path d="M19.8218 19.8217L26.2501 26.25" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
                  </svg>
                </a>
                <a className=" text-sm text-base text-black-500 hover:text-gray-900 ml-5" onClick={this.openAuth}>
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18.75C19.1421 18.75 22.5 15.3921 22.5 11.25C22.5 7.10786 19.1421 3.75 15 3.75C10.8579 3.75 7.5 7.10786 7.5 11.25C7.5 15.3921 10.8579 18.75 15 18.75Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
                    <path d="M3.63135 25.3114C4.78396 23.3164 6.44128 21.6598 8.43684 20.508C10.4324 19.3563 12.6959 18.75 15 18.75C17.304 18.75 19.5675 19.3564 21.563 20.5082C23.5586 21.6599 25.2159 23.3166 26.3684 25.3116" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </nav>

            </div>
          </div>
          
          <AuthWindow hidden={this.state.auth} hideFunc={this.closeAuth}/>
        </header>
      );
    }
  }


