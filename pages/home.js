import React from 'react'
import "../styles/styles.scss";
import { withRouter } from 'next/router'
import Main from '../components/main'
import Head from '../components/head'

const sleep = (s) => new Promise((res, rej) => setTimeout(res, s * 1000))

const CHANNEL_NAME = 'lipp_tv_'

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
    const { router } = this.props
    const chatEmbedSrc = `https://www.twitch.tv/embed/${CHANNEL_NAME}/chat?parent=lipp.tv`
    
    if (router.asPath.indexOf('/chat-only') == 0) {
      return (
          <div className="chat-container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%'}}>
            <iframe frameborder="0"
                    scrolling="yes"
                    id="chat_embed"
                    src={chatEmbedSrc}
                    height="600"
                    width="800">
            </iframe>
          </div>
      )
    }

    // if (router.asPath.indexOf('/active') == 0) {
      this.streamActive = true
    // }

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