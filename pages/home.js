import React from 'react'
import "../styles/styles.scss";
import { withRouter } from 'next/router'
import ContextProvider from '../context/main'
import Main from '../components/main'

const sleep = (s) => new Promise((res, rej) => setTimeout(res, s * 1000))

class Home extends React.Component {
  static async getInitialProps(ctx) {
    return {
    }
  }

  render() {
    return (
      <>
        LIPP.TV
      </>
    )
  }
}

export default withRouter(Home)