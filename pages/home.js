import React from 'react'
import "../styles/styles.scss";
import { withRouter } from 'next/router'
import Main from '../components/main'
import Head from '../components/head'

const sleep = (s) => new Promise((res, rej) => setTimeout(res, s * 1000))

const CHANNEL_NAME = 'mocancezar'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.streamActive = false
  }
  static async getInitialProps(ctx) {
    return {
    }
  }

  render() {
    console.log('router: ', this.props.router)
    const { router } = this.props
    const chatEmbedSrc = `https://www.twitch.tv/embed/${CHANNEL_NAME}/chat?parent=lipp.tv`
    
    if (router.asPath == '/chat-only') {
      return (
        <div className="chat-container">
          <iframe frameborder="0"
                  scrolling="yes"
                  id="chat_embed"
                  src={chatEmbedSrc}
                  height="500"
                  width="350">
          </iframe>
        </div>
      )
    }

    if (router.asPath == '/active') {
      this.streamActive = true
    }

    return (
      <>
        <Head/>
        <Main 
          streamActive={this.streamActive}
          channelName={CHANNEL_NAME}
        />
      </>
    )
  }
}

export default withRouter(Home)