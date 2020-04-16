import React from 'react'
import { get } from 'dotty';
import classnames from 'classnames'
import "../styles/styles.scss"

class Home extends React.Component {
  state = {
  }

  constructor({ activeSlug }) {
    super();
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.setState({ 
      TwitchEmbedVideo: require('react-twitch-embed-video')
    })
    
  }

  componentWillUnmount() {
  }

  render() {
    const { TwitchEmbedVideo } = this.state
    console.log(TwitchEmbedVideo)
    return (
      <div className="container">
        <div className="content">
          { TwitchEmbedVideo && <TwitchEmbedVideo
            autoplay
            channel="mattromein"
            height="480"
            muted={false}
            targetId="twitch-embed"
            width="940"
          /> }
        </div>
        <div className="header">
          <div></div>
          <div><h1>LIPP.TV</h1></div>
          <div className="logo-container">
          </div>
        </div>
      </div>
    )
  }
}

export default Home