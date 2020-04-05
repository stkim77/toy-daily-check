import React, { Component } from 'react';
import Router from 'next/router';
import { Layout } from 'antd';
import { Header, Loading } from '../components';
import { HEADER_MENU } from '../config/constant';

class Index extends Component {
  state = {
    auth: false
  };

  componentDidMount() {
    setTimeout(()=>{
      this.setState({auth: true})
    }, 2000);
  }

  render() {
    if (this.state.auth) {
      Router.push(`/${HEADER_MENU[0]}`);
      // return null;
    };

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Loading />
      </Layout>
    );
  }
}

export default Index;