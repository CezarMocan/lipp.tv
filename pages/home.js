import React from 'react'
import "../styles/styles.scss";
import { withRouter } from 'next/router'
import Main from '../components/main'
import Head from '../components/head'

const sleep = (s) => new Promise((res, rej) => setTimeout(res, s * 1000))

class Home extends React.Component {
  static async getInitialProps(ctx) {
    return {
    }
  }

  render() {
    return (
      <>
        <Head/>
        <Main/>
      </>
    )
  }
}

export default withRouter(Home)