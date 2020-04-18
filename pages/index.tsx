import React, { Component } from 'react';
import Router from 'next/router';
import { Layout } from 'antd';
import { Header, Loading } from '../components';
import { HEADER_MENU } from '../config/constant';
import moment from 'moment';

moment.updateLocale("en", { week: {
  dow: 1, // First day of week is Monday
  doy: 4  // First week of year must contain 4 January (7 + 1 - 4)
}});

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
      Router.push(`/${HEADER_MENU[0]}?menu=MONTH`);
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