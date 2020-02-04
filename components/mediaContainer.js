import React from 'react'
import classnames from 'classnames'
import { Player, ControlBar, BigPlayButton } from 'video-react'
import MuxPlayer from 'sanity-mux-player'
import imageUrlBuilder from '@sanity/image-url'
import sanityClient from '../modules/sanity'
import HLSSource from './hlsSource'

const imageBuilder = imageUrlBuilder(sanityClient)
const imageUrlFor = (asset) => imageBuilder.image(asset)
const videoUrlFor = (asset) => `https://stream.mux.com/${asset.playbackId}.m3u8`

export default class MediaContainer extends React.Component {
  state = {
    src: ''
  }

  renderVideo = (asset, index) => {
    const { open, videoRefHandler } = this.props
    const { src } = this.state

    const videoPlayerCls = classnames({
      'video-player': true,
      'hidden': !open 
    })

    return (
      <Player ref={ (p) => { if (videoRefHandler) videoRefHandler(p) } } 
        key={`player-${index}`}
        preload='auto'
        playsInline 
        // src={src}
        fluid={false}
        width="100%"
        height="100%"
        autoplay={false}
        className={videoPlayerCls}
      >
        <ControlBar disableCompletely={true}/>
        <HLSSource
          isVideoChild
          src={src}
        />
      </Player> 
    )
  }

  renderImage = (asset, index) => {
    const { open } = this.props
    const { src } = this.state

    const imageCls = classnames({
      'image-player': true,
      'hidden': !open 
    })

    return (
      <img 
        key={`image-${index}`}
        src={src}
        height="100%"
        className={imageCls}
      />
    )
  }

  generateSrcFromAsset(asset) {
    if (asset.video) {
      return videoUrlFor(asset.video.asset)
    } else if (asset.image) {
      const { windowWidth } = this.props
      return imageUrlFor(asset.image.asset).width(windowWidth).url()
    }      
    return ""
  }

  componentDidUpdate(oldProps) {
    if (oldProps.windowWidth != this.props.windowWidth || oldProps.asset != this.props.asset) {
      const { asset } = this.props
      let src = this.generateSrcFromAsset(asset)
      this.setState({ src })
    }
  }

  componentDidMount() {
    const { asset } = this.props
    let src = this.generateSrcFromAsset(asset)
    this.setState({ src })
  }

  render() {
    const { asset, index } = this.props
    if (!asset) return null
    if (asset.video) return this.renderVideo(asset, index)
    if (asset.image) return this.renderImage(asset, index)
  }
}

MediaContainer.defaultProps = {
  index: -1,
  asset: null,
  open: false,
  videoRefHandler: null
}